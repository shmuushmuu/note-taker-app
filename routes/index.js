const router = require('express').Router();
const path = require('path');
const notesRouter = require('./notesRouter');
router.use(notesRouter);

// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for notes page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/pages/notes.html'))
);

module.exports = router;