const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import User model
const User = require('./models/userModel');

// configurations
const app = express();
const port = 5000;
const saltRounds = 10;
const jwtSecret = 'secret';

app.use(express.json());
app.use(cors());

const connection = 'mongodb://localhost:27017/EZRecipes';

mongoose.connect(connection, {})
  .then((result) => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// registration endpoint/function
app.post('/register', async (req, res) => {

    const { username, password } = req.body;

    try {
        // check to see if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send("User already exists");

        // hashing password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            pantry: [],
            shoppingList: []
        })
        newUser.save()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.error(err)
                res.status(500).send('Error registering user')
            })
    }
    catch (err) {
        console.error(err)
        res.status(500).send('Error registering user')
    }
    
});

// login endpoint/function
app.post('/login', async (req, res) => {
    const { username , password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json( { error: 'Invalid username or password'});
        }

        const token = jwt.sign({ id: user._id} , jwtSecret , {expiresIn: '1h'});
        res.json({ token, username: user.username})

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error logging in user' });
    }
});

// get pantry
app.get('/pantry/:username', (req, res) => {
  const { username } = req.params;

  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user.pantry);
    })
    .catch((err) => res.status(500).json({ error: 'Error fetching pantry' }));
});

// generate recipes with saved pantry from user
app.post('/pantry/:username', (req, res) => {
  const { username } = req.params;
  const { ingredient } = req.body;

  User.findOneAndUpdate(
    { username },
    { $addToSet: { pantry: ingredient } }, // $addToSet avoids duplicates
    { new: true } // Return the updated document
  )
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user.pantry);
    })
    .catch((err) => res.status(500).json({ error: 'Error updating pantry' }));
});

// remove ingredients from the user's saved pantry
app.delete('/pantry/:username', (req, res) => {
    const { username } = req.params;
    const { ingredient } = req.body;
  
    User.findOneAndUpdate(
      { username },
      { $pull: { pantry: ingredient } }, // $pull removes the ingredient
      { new: true } // Return the updated document
    )
      .then((user) => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user.pantry);
      })
      .catch((err) => res.status(500).json({ error: 'Error updating pantry' }));
});

// shopping list functions

// add ingredients to the user's shopping list
app.post('/shoppingList/:username', async (req, res) => {
  const { username } = req.params;
  const { ingredient } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.shoppingList.includes(ingredient)) {
      return res.status(400).json({ error: 'Ingredient already in the shopping list' });
    }

    user.shoppingList.push(ingredient);
    await user.save();

    res.json(user.shoppingList);
  } catch (error) {
    res.status(500).send('Error updating shopping list');
  }
});

// remove ingredients from the user's shopping list
app.delete('/shoppingList/:username', async (req, res) => {
  const { username } = req.params;
  const { ingredient } = req.body;

  try {
      const user = await User.findOneAndUpdate(
          { username },
          { $pull: { shoppingList: ingredient } },
          { new: true }
      );
      res.json(user.shoppingList);
  } catch (error) {
      res.status(500).send('Error removing ingredient from shopping list');
  }
});

// add ingredient to pantry from shopping list
app.post('/pantry/fromShoppingList/:username', async (req, res) => {
  const { username } = req.params;
  const { ingredient } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.pantry.includes(ingredient)) {
      user.pantry.push(ingredient);
      user.shoppingList = user.shoppingList.filter(item => item !== ingredient);
      await user.save();
    } else {
      user.shoppingList = user.shoppingList.filter(item => item !== ingredient);
      await user.save();
    }

    res.json({ pantry: user.pantry, shoppingList: user.shoppingList });
  } catch (error) {
    res.status(500).send('Error moving ingredient to pantry');
  }
});

// get shopping list for a user

app.get('/shoppingList/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.shoppingList);
  } catch (error) {
    res.status(500).send('Error fetching shopping list');
  }
});

// save recipe to user

app.post('/saveRecipe/:username', async (req, res) => {
  const { username } = req.params;
  const { recipeID, recipeName, recipeImage } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { savedRecipes: { recipeID, recipeName, recipeImage,  } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Error saving recipe' });
  }
});

// get user's all saved recipes
app.get('/savedRecipes/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching saved recipes' });
  }
});

// remove selected saved recipe
app.delete('/savedRecipes/:username/:recipeID', async (req, res) => {
  const { username, recipeID } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { savedRecipes: { recipeID: recipeID } } }, // $pull removes the recipe
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).send('Error removing recipe');
  }
});

app.listen(port, () => {
    console.log(`Server running`);
});