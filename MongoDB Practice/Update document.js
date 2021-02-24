show dbs

use sampledb

show collections

db.sampledata.updateOne({name:"javascript"}, {$set: {type: "Full Stack"}})

db.sampledata.updateOne({name:"javascript"}, {$set: {type: "Front End"}})

db.sampledata.updateMany({type:"Front End"}, {$set: {active:false}})