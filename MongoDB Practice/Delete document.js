show dbs

use sampledb

show collections

db.sampledata.deleteOne({active: true})

db.sampledata.deleteMany({type:"Full Stack"})

//deletes all documents
db.sampledata.deleteMany({})