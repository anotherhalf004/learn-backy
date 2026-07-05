const express = require('express');
const noteModel = require('./models/note.model');

const app = express();

app.use(express.json());

// POST  -- create a note
app.post('/notes', async (req, res) => {
    const data = req.body; // { title , desc }
    await noteModel.create({
        title: data.title,
        desc: data.desc
    });

    res.status(201).json({
        message: 'Note created'
    });
});


module.exports = app;