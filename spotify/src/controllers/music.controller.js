const musicModel = require('../models/music.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized/ Invalid token' });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'artist') {
            return res.status(403).json({ message: 'You dont have access to create music' })
        }
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'Music file is required' });
    }

    let result;

    try {
        result = await uploadFile(file.buffer.toString('base64'));
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to upload music' });
    }

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(200).json({
        message: 'Music created successfully',
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })

}

module.exports = { createMusic };