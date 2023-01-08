const express = require('express');
const PORT = process.env.PORT || 3001;
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Note Taker');
});

app.listen(PORT, () =>
    console.log(`Hey! Check the note taker out at http://localhost:${PORT} ... ya know, if you really wanna.`)
);
