const mongoose = require('mongoose');

const movieWatchListSchema = new mongoose.Schema({
    title: String,
    image: String,
    username: String,
    imdbID: String
});


module.exports = mongoose.model('MovieWatchList', movieWatchListSchema);

