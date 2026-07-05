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

app.get('/notes/', async (req,res) => {
    
    const notes = await noteModel.find(); // returns array of objects ```matching the condition (if given)``` else an empty array
    /* 
    const note = await noteModel.findOne({ // returns single object matching the condition else NULL
        title: "test-title"
    }); 
    */

    res.status(200).json({
        message:"note fetched",
        notes:notes
    });
})

app.delete('/notes/:id', async (req,res) => {
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id : id
    })

    res.status(200).json({
        message:"note deleted"
    })
});

app.patch('/notes/:id',async (req,res) => {
    const id = req.params.id;
    const desc = req.body.desc;

    await noteModel.findOneAndUpdate({_id:id},{desc : desc})

    res.status(200).json({
        message : 'note updated'
    })
})


module.exports = app;