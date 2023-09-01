const express = require('express');
const path = require('path');
const promisify = require('./promisify')

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// API GET route that reads the json, previous notes.
app.get('/api/notes', (req, res) => {
    promisify.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})



// API POST route
app.post('/api/notes', (req, res) => {
    const newNote = {
        "title":"Note Title",
        "text":"Some to do's for this note."
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
