const express = require('express');
var cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

mongoose.connect('mongodb://localhost:27017/notes-database');

app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => {
  res.send('Server Page')
});

app.post('/api/register', async (req, res) => {
  try {
    // use bCrypt to encrypt password when provided, rather than store provided password as a string
    const newPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'could not register' });
  }
})

app.post("/api/login", async (req, res) => {
    //find user based on login info passed in from login page, using the email address provided
    const user = await User.findOne({
      email: req.body.email,
    })
    // if no user is found using the email, passback an error advising as such
    if (!user) { return { status: 'error', error: 'Invalid email' } }

    // if user is found, check the encrypted password passed in, against the encrypted password in the db
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    // if it's valid, then create a token
    if (isPasswordValid) {
      const token = jwt.sign({
          name: user.name,
          email: user.email
      },
      'secret123'
      )
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
});

app.get("/api/quote", async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email;
    const user = await User.findOne({ email: email })
    return res.json({ status: 'ok', quote: user.quote })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
});

app.post("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $set: {quote: req.body.quote} }
      )

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});


app.listen(3001, () => {
  console.log('server started on Port: 3001')
})
