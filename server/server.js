const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const Word = require('./model');
const {mongoURI} = require('./serverconfig');

//connect to db
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('DB CONNECTED')
    })
    .catch(err => {
        console.log('DB FAIL');
    })


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('this is the server');
  });

// handle post requests from chrome extension to database
app.post('/', (req, res) => {
    // req.body.word is the word
    // req.body.definition is the definition
    // add the word and its definition into the database
    console.log(req.body)
    Word.create(req.body);
    res.status(200);
});

// handle get requests from front-end to the database
app.get('/api', (req, res) => {
    Word.find({}, (err, words) => {
        // console.log(words)
        res.json(words)
      });
});

// handle delete requests
app.delete('/api/:word', (req, res) => {
    Word.deleteMany({word: req.params.word}, (err, words) => {
        console.log('in delete route')
        res.send('deleted')
    })
})

// handle patch requests to update difficulty
app.patch('/api/:word', (req, res) => {
    console.log('the difficulty to patch is ' + req.body.difficulty)
    Word.updateMany(
        { word: req.params.word }, 
        { 
            difficulty: req.body.difficulty

        },
        (err, words) => {
        console.log('in patch route')
        res.send('patched')
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });


