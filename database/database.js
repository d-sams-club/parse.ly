const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

mongoose.connect('mongodb://localhost/parsely', { useNewUrlParser: true }).catch((err) => {
  console.log('Having trouble with Database => ', err.message);
});

const songSchema = new mongoose.Schema({
  songname: String,
  artistname: String,
  score: Number,
  polarity: String,
  youtubelink: String,
});
songSchema.plugin(findOrCreate);

const userSchema = new mongoose.Schema({
  username: String,
  userid: Number,
});

const favoriteSongSchema = new mongoose.Schema({
  songname: String,
  artistname: String,
  score: Number,
  polarity: String,
  trackId: Number,
});

const Song = mongoose.model('Song', songSchema);
const User = mongoose.model('User', userSchema);
const FavoriteSongs = mongoose.model('FavoriteSongs', favoriteSongSchema);

const saveFavorite = function(song) {
  console.log('song', song)
  let Mysong = new FavoriteSongs({
    songname: song.songname,
    artistname: song.artist,
    score: song.score,
    polarity: song.polarity,
    trackId: song.trackId
  })
  Mysong.save();
  console.log(song, 'song has been saved!');
}


module.exports = {
  Song,
  User,
  FavoriteSongs,
  saveFavorite
};
