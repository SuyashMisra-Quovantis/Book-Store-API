const mongoose = require("mongoose");

//Connecting to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/mongooseCrudDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

//creating a schema
const gameSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  onSale: Boolean,
  price: Number,
});

//creating a model for the scheme. Think of a Model as an Instance of the given Schema. This returns a new Game class.
const Game = mongoose.model("Game", gameSchema);

// const game = new Game({
//   title: "The Legend of Zelda: Breath of the Wild",
//   publisher: "Nintendo",
//   tags: ["adventure", "action"],
//   onSale: false,
//   price: 59.99,
// });

//CREATE or INSERT
const saveGame = async () => {
  try {
    const game = new Game({
      title: "Shovel Knight: Treasure Trove",
      publisher: "Yacht Club Games",
      onSale: true,
      price: 10.99,
      tags: ["adventure", "platformer"],
    });

    const result = await game.save();
    //   console.log(result);
  } catch (error) {
    console.log("Error occured: ", error);
  }
};

// saveGame();

//READ
// const getGames = async () => {
//   try {
//     const result = await Game.find();
//     console.log(result);
//   } catch (error) {
//     console.log("Error occured: ", error);
//   }
// };

//passing filter to find
// const getGames = async () => {
//   try {
//     const games = await Game.find({
//       publisher: "Nintendo",
//       onSale: true,
//     })
//       .sort({ price: 1 })
//       .select({ title: 1, price: 1 });
//     console.log(games);
//   } catch (error) {
//     console.log("Error occured: ", error);
//   }
// };

//Comparison Query Operators
// const getGames = async () => {
//   try {
//     const games = await Game.find({
//       price: { $lt: 40 },
//     })
//       .sort({ price: 1 })
//       .select({ title: 1, price: 1 });
//     console.log(games);
//   } catch (error) {
//     console.log("Error occured: ", error);
//   }
// };

//Logical Query Operators
const getGames = async () => {
  try {
    const games = await Game.find()
      .or([{ publisher: "Nintendo" }, { onSale: true }])
      .and([{ price: { $lt: 50 } }])
      .sort({ price: 1 })
      .select({ title: 1, price: 1 });
    console.log(games);
  } catch (error) {
    console.log("Error occured: ", error);
  }
};

// getGames();

//UPDATE
// const updateGame = async (id) => {
//   try {
//     const game = await Game.findById(id);
//     if (!game) return;

//     game.price = 24;

//     const result = await game.save();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

//id of Legend of Zelda
// updateGame("6036d46e7f427e0d34eec684");

//Updating a Document using Update First
// const updateGame = async (id) => {
//   try {
//     const result = await Game.updateOne(
//       { _id: id },
//       {
//         $set: {
//           title: "A Link Between Worlds",
//           price: 55,
//         },
//       }
//     );
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

const updateGame = async (id) => {
  try {
    const result = await Game.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: "Ocarina of Time",
          price: 35,
        },
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
// updateGame("6036d46e7f427e0d34eec684");

//DELETE
const deleteGame = async (id) => {
  try {
    const result = await Game.deleteOne({ _id: id });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

deleteGame("6036d46e7f427e0d34eec684");
