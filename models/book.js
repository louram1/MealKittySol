const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });

const recipeSchema = new Schema({
  UserId:{type: Number, required: true},
  Cuisine: { type: String, required: true },
  Title: { type: String, required: true },
  imageURL: String,
  InstructionURL: {type: String, required: true},
  Ingredients: {type: String, required: true}
  
});

//const Book = mongoose.model("Book", bookSchema);
const Recipes = mongoose.model("recipes", recipeSchema);
//module.exports = Book;
module.exports = Recipes;
