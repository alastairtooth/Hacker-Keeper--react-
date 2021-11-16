const express = require('express');
var cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user.model")
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/notes-database');

app.use(cors());
app.use(express.json())

app.get("/", async (req, res) => {
  res.send('Server Page')
});

app.post('/api/register', async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'could not register' });
  }
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    })

    if (user) {
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

app.listen(3001, () => {
  console.log('server started on Port: 3001')
})
