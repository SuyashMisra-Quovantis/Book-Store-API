const mongoose = require("mongoose");
const validator = require("validator");

//connection creation and creating a new db or using an existing db
mongoose
  .connect("mongodb://localhost:27017/mongoosedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

//mongoose schema defines the structure of the document
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ctype: String,
  videos: Number,
  author: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
});

//collection creation, collection name passed in model must be singular and it automatically converts into plural and should be in pascal case
//mongoose.model returns a class
const Playlist = mongoose.model("Playlist", playlistSchema);

/*
Can also be written as
const Playlist = mongoose.model("Playlist", {
    name: String,
    ctype:String,
    videos: Number,
    author:String,
    active:Boolean,
    date:{
        type: Date,
        default: Date.now
    }
})
*/

//Document creation
const reactPlaylist = new Playlist({
  name: "React",
  ctype: "Back End",
  videos: 35,
  author: "Suyash",
  active: true,
});

/*
//Insert document
reactPlaylist
  .save()
  .then(() => {
    console.log(reactPlaylist);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
*/

/*
We can also use async await

const createDocument = async () => {
  try {
    //create or insert document
    const reactPlaylist = new Playlist({
      name: "React",
      ctype: "Back End",
      videos: 35,
      author: "Suyash",
      active: true,
    });

    //save method returns a promise, for this we use async await
    const result = await reactPlaylist.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

createDocument();
*/

//Creating a task model
const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

//creating a new document
const task = new Task({
  description: "      Learn about mongoose        ",
  //   completed: true,
});

//Inserting the document
task
  .save()
  .then(() => {
    console.log("Task saved successfully: ", task);
  })
  .catch((err) => {
    console.log("Error occured: ", err);
  });

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (value.length <= 6) {
        throw new Error("Password must have more than 6 characters!");
      } else if (value.toLowerCase().includes("password")) {
        throw new Error("Weak password!");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate: (value) => {
      if (value < 0) {
        throw new Error("Age must be positive!");
      }
    },
  },
});

const sampleUser = new User({
  name: "    Suyash    ",
  email: "SUYASH@GMAIL.COM       ",
  password: "           Passwd@123",
});

/*
sampleUser
  .save()
  .then(() => {
    console.log(sampleUser);
  })
  .catch((error) => {
    console.log("Error occurred: ", error);
  });
*/
