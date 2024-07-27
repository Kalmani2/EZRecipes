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



app.listen(port, () => {
    console.log(`Server running`);
});