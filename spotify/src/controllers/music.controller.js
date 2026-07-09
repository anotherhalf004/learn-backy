const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');
const { uploadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {

        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Music file is required' });
        }
        
        const result = await uploadFile(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
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

async function createAlbum(req,res) {

        const {title , musics} = req.body;

        const album = await albumModel.create({
            title,
            musics : musics,
            artist : req.user.id
        })

        res.status(201).json({
            message : 'Album created successfully',
            album : {
                id : album._id,
                title : album.title,
                musics : album.musics,
                artist : album.artist
            }
        })
}

async function getAllMusics(req,res) {
    const musics = await musicModel.find()
      .populate('artist' , "username email"); // .populate('artist') --> gives the details of the artists instead of id

    res.status(200).json({
        message : 'Music fetched successfully',
        musics
    })
}

async function getAllAlbums(req,res) {
    
    const albums = await albumModel.find().populate('artist', 'username email');
    

    res.status(200).json({
        message : 'Albums fetched successfully',
        albums
    })
}

async function getAlbumById(req,res) {
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate('artist', 'username email').populate('musics');

    return res.status(200).json({
        message : 'Album fetched',
        album
    })
}


module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };