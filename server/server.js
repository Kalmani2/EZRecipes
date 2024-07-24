const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');


// import User model
const User = require('./models/userModel');

const app = express();
const port = 5000;
const saltRounds = 10;

app.use(express.json());
app.use(cors());

const dbURI = 'mongodb://localhost:27017/EZRecipes';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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



app.listen(port, () => {
    console.log(`Server running`);
});