const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');


// connect to the database
mongoose.connect('mongodb://localhost:27017/MyPantry', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the pantry
const itemSchema = new mongoose.Schema({
    name: String,
    Carbohydrate: String,
    Cholesterol: String,
    Energy: String,
    Fat_Saturated: String,
    Fat_Trans: String,
    Fiber: String,
    Protein: String,
    Sodium: String,
    Sugar: String,
    Total_Lipids: String,
    Ingredients: String,
    path: String,
    quantity: String,
});



// Create a model for items in the pantry.
const Item = mongoose.model('Item', itemSchema);


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});


// Create a new item in the pantry
app.post('/api/add', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    Carbohydrate: req.body.Carbohydrate,
    Cholesterol: req.body.Cholesterol,
    Energy: req.body.Energy,
    Fat_Saturated: req.body.Fat_Saturated,
    Fat_Trans: req.body.Fat_Trans,
    Fiber: req.body.Fiber,
    Protein: req.body.Protein,
    Sodium: req.body.Sodium,
    Sugar: req.body.Sugar,
    Total_Lipids: req.body.Total_Lipids,
    Ingredients: req.body.Ingredients,
    path: req.body.path,
    quantity: req.body.quantity,
  });
  try {
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
    try {
      let items = await Item.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

app.delete('/api/delete/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
try {
  let item = await Item.findOne({
    _id: req.params.id
  });
  item.path = req.body.path;
  await item.save();
  res.sendStatus(200);
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});

app.put('/api/dec/:id', async (req, res) => {
    try {
        let item = await Item.findOne({
            _id: req.params.id
        });
        item.quantity = parseInt(item.quantity) - 1;
        await item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/inc/:id', async (req, res) => {
    try {
        let item = await Item.findOne({
            _id: req.params.id
        });
        item.quantity = parseInt(item.quantity) + 1;
        await item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
