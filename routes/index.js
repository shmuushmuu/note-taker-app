const router = require('express').Router();
const path = require('path');

const {readAndAppend, readFromFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
router.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { client, note } = req.body;
  
    if (req.body) {
      const newNote = {
        client,
        note,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`We have your note. We can all remember it later!`);
    } else {
      res.error('There was an error in adding that note.');
    }
  });

module.exports = router;