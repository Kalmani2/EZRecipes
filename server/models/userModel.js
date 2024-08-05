const mongoose = require('mongoose');

const savedRecipeSchema = new mongoose.Schema({
  recipeID: { type: String, required: true },
  recipeName: { type: String, required: true },
  recipeImage: { type: String, required: true },
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pantry: [{ type: String }],
  shoppingList: [{ type: String }],
  savedRecipes: [savedRecipeSchema]
});

module.exports = mongoose.model('User', userSchema);