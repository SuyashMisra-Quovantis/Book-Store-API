show dbs

use sampledb

db.sampledata.find()

db.sampledata.insertOne({name: "MongoDB", type: "Database", videos: 5, active: true})

db.sampledata.insertMany([{name: "NodeJS", type: "Back End", videos: 40, active: true},
{name: "javascript", type: "Scripting", videos: 50, active: false},
{name: "Angular", type: "Front End", videos: 35, active:false}])