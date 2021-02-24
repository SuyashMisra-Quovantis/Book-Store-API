show dbs

use sampledb

show collections

db.sampledata.find()

db.sampledata.find().pretty()

db.sampledata.find({name:"MongoDB"})

db.sampledata.find({name:"MongoDB"}).pretty()

//display only name field
db.sampledata.find({name:"MongoDB"}, {name:1})

//display name field and hide id
db.sampledata.find({name:"MongoDB"}, {name:1, _id:0})

db.sampledata.find({videos:{$lt:40}})

db.sampledata.find({videos:{$ne:40}})

db.sampledata.find({name:{$in:["MongoDB", "Angular"]}})

db.sampledata.find({name:{$nin:["MongoDB", "Angular"]}})

db.sampledata.find({$and:[{name:"Angular"},{videos: {$gte:35}}]})

db.sampledata.find({$or:[{name:"Angular"},{videos: {$gte:35}}]})

db.sampledata.find({videos: {$gt:10}, $or: [{name: "javascript"},
   {active: true}]})

db.sampledata.find({$nor: [{videos: {$gt:35}}, {active: false}]})

db.sampledata.find( { videos: { $not: { $gt: 40 } } } )

db.sampledata.find({active: true}).limit(1)

db.sampledata.findOne({active:true})

db.sampledata.find({active:true}).limit(1).skip(1)