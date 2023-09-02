const express = require('express');
const path = require('path');
const promisify = require('./promisify')
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// API GET route that reads the notes stored in the json file.
app.get('/api/notes', (req, res) => {
    promisify.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

// API POST route
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body

    const newNote = {
        "title": title,
        "text": text,
        "id": uuidv4()
    };

    promisify.readAndAppend(newNote, './db/db.json')
    res.json('New note added!')
})

// GET route for notes page.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// GET Route for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.listen(PORT, () => console.log(`App listening on port ${PORT}.`))
