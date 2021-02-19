show dbs
use newDB
db.createCollection("testCollection")
db.testCollection.insertOne({firstName:"Suyash", lastName:"Misra", age:23, email:"abc@gmail.com", isSelected:true})
db.testCollection.find()