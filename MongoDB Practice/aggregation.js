show dbs

use sampledb

show collections

db.sampledata.find()

db.sampledata.aggregate([
{$group : {_id: "$active", myResult: {$sum: 1}}}
])


db.sampledata.aggregate([{$group: 
{_id : "$active", 
maxVideos : {$max : "$videos"}
}
}])

db.sampledata.aggregate([{$group: 
{_id : "$active", 
minVideos : {$min : "$videos"}
}
}])

db.mycol.aggregate([{$group : {_id : "$active", avg_videos : {$avg : "$videos"}}}])