const express = require('express');
const fs = require("fs");
// const { parse } = require('path');
const path = require('path');
const { v4: uuid } = require('uuid');

//.env.PORT is for Heroku to help it work when deployed
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path).join(__dirname, './public/index.html')
 // res.send('Note Taker');
});

app.get('/notes.html', (req, res) => {
  res.sendFile(path).join(__dirname, './public/notes.html')
})

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
})

app.post('/api/notes', (req, res) => {
  fs.readFileSync('./db/db.json', 'utf8');
  const notes = JSON.parse(data);
  const newNote = {
    ...req.body,
    id: uuid4()
  };
  notes.push(newNote);
  fs.writeFileSync('/db/db.json', 'utf8');
  res.json(notes);
})

app.listen(PORT, () =>
    console.log(`Hey! Check the note taker out at http://localhost:${PORT} ... ya know, if you really wanna.`)
);
