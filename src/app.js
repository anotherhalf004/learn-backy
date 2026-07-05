const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

// POST
app.post('/notes', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'No request body' });
    }

    notes.push(req.body);

    res.status(201).json({
        message: 'Note created',
        note: req.body
    });
});

//GET
app.get('/notes',(req,res) => {
    res.status(200).json({
        message:"notes fetched.",
        notes:notes
    })
});

//DELETE
app.delete('/notes/:idx',(req,res) => {
    const index = req.params.idx;

    delete notes [index];

    res.status(200).json({
        message:"note deleted."
    });
});

//PATCH
app.patch('/notes/:idx',(req,res) => {
    const index = req.params.idx;
    const desc = req.body.desc;

    notes[index].desc = desc;

    res.status(200).json({
        message:'note updated.'
    });
});


module.exports = app;