
const Song = require("../models/song");
const { deleteImg } = require("../utils/deleteImg");
const { getIo } = require("../utils/socket");

// ALL SONGS
const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    return res.status(200).json(songs);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// ADD SONG
const addSong = async (req, res, next) => {
  try {
    const addNewSong = new Song(req.body);

    if (req.file) {
      addNewSong.dedicatedImg = req.file.path;
      addNewSong.img = "yes";
    } else {
      addNewSong.dedicatedImg = "https://res.cloudinary.com/dk0mmf7hv/image/upload/v1721240698/chonijaDJ/Noimg_zlbl8a.webp";
      addNewSong.img = "no";
    }

    await addNewSong.save();

    // Emit socket event
    const io = getIo();
    io.emit('newSong', { message: 'Nueva canción añadida', song: addNewSong });

    return res.status(201).json({ message: "Canción enviada correctamente." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "No se ha podido enviar la canción. Inténtalo de nuevo." });
  }
};

// DELETE SONG
const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.dedicatedImg !== "https://res.cloudinary.com/dk0mmf7hv/image/upload/v1721240698/chonijaDJ/Noimg_zlbl8a.webp") {
      deleteImg(song.dedicatedImg);
    }

    await Song.findByIdAndDelete(id);
    return res.status(200).json({ message: "Canción eliminada." });
  } catch (err) {
    return res.status(404).json({ error: "No se ha podido eliminar" });
  }
};

// VIEW SONG
const viewSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    song.status = "viewed";
    await song.save();

    // Emit socket event
    const io = getIo();
    io.emit('viewSong', { message: 'Nueva canción emitida', song: song });

    return res.status(200).json({ message: "Canción emitida al proyector." });
  } catch (err) {
    return res.status(404).json({ error: "No se ha podido emitir la canción." });
  }
};

module.exports = { getSongs, addSong, deleteSong, viewSong };