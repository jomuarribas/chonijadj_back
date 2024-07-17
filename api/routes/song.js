const express = require('express');
const { upDedicatedImg } = require('../middlewares/uploadImg');
const { getSongs, addSong, deleteSong, viewSong } = require('../controllers/song');

const songRoutes = express.Router();

songRoutes.get('/', getSongs)
songRoutes.post('/register', upDedicatedImg.single("dedicatedImg"), addSong)
songRoutes.delete('/delete/:id', deleteSong)
songRoutes.put('/viewsong/:id', viewSong)

module.exports = songRoutes;