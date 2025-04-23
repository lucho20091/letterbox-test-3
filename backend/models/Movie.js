const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    slug: String,
    image: String,
    smallImage: String,
    description: String,
    titleYear: String,
});


module.exports = mongoose.model('Movie', movieSchema);

