const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Título de la canción requerido'], trim: true },
  artist: { type: String, required: [true, 'Artista requerido'], trim: true },
  dedicatedBy: { type: String, required: [true, 'Autor/es de la dedicación requerido'], trim: true },
  dedicatedImg: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
},
  {
    collection: 'songs',
  });

const Song = mongoose.model('Song', songSchema, 'songs');
module.exports = Song;