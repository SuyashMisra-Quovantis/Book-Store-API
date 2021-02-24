show dbs

use sampledb

show collections

//creates an index on name field of each document
db.sampledata.ensureIndex({name : 1})

db.sampledata.find({name:"MongoDB"})

db.sampledata.dropIndex({name: 1})

db.sampledata.find({name:"MongoDB"})