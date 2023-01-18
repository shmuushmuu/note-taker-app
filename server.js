const express = require('express');
const fs = require("fs");
const path = require('path');
const { v4: uuid4 } = require('uuid');

//.env.PORT is for Heroku to help it work when deployed
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path).join(__dirname, './public/index.html')
 // res.send('Note Taker');
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/notes.json', 'utf8');
  const notes = JSON.parse(data);
  res.json(notes);
})

app.post('/api/notes', (req, res) => {
  const data = fs.readFileSync('./db/notes.json', 'utf8');
  const notes = JSON.parse(data);
  const newNote = {
    ...req.body,
    id: uuid4()
  };
  notes.push(newNote);
  const jsonNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/notes.json', jsonNotes);
  res.json('This has been saved!');
})

app.delete('/api/notes/:id', (req, res) => {
  const data = fs.readFileSync('./db/notes.json', 'utf8');
  const notes = JSON.parse(data).filter(note => note.id !== req.params.id);
  const jsonNotes = JSON.stringify(notes, null, 2);
  fs.writeFileSync('./db/notes.json', jsonNotes);
  res.json('note has been deleted!');
})

app.listen(PORT, () =>
    console.log(`Hey! Check the note taker out at http://localhost:${PORT} ... ya know, if you really wanna.`)
);
