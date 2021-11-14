const express = require('express');
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

app.post('/api/register', (req, res) => {
  console.log(req.body);
  res.json({status: 'Ok'})

})

app.listen(3001, () => {
  console.log('server started on Port: 3001')
})
