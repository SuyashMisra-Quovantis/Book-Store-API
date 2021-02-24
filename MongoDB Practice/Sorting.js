show dbs

use sampledb

show collections

//display the name of documents sorted in ascending order
db.sampledata.find({},{name:1,_id:0}).sort({name:1})

//display the name of documents sorted in descending order
db.sampledata.find({},{name:1,_id:0}).sort({name:-1})