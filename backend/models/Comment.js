const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    movieSlug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
