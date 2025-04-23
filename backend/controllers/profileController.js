const Comment = require('../models/Comment.js');
const User = require('../models/User.js');
const Movie = require('../models/Movie.js');
const MovieWatchList = require('../models/MovieWatchList.js');
const dotenv = require('dotenv');
dotenv.config();

const get_Profile_ratings = async (req, res) => {
    const { username } = req.params;
    const user = await get_User(username);
    const comments = await Comment.find({ username: username });
    const MoviesRated = await Promise.all(comments.map(async (comment) => {
        const movie = await Movie.findOne({ slug: comment.movieSlug });
        return { ...movie.toObject(), rating: comment.rating };
    }));
    res.status(200).json({ user, MoviesRated });
}

const get_User = async (username) => {
    const user = await User.findOne({ username: username });
    const userData = {
        username: user.username,
        image: user.image,
    }
    return userData;
}

const get_all_profiles = async (req, res) => {
    try {

        // Get user profiles for those usernames
        const profiles = await User.find()
            .select('username image');
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const search_movie = async (req, res) => {
    const movieName = req.params.title;
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${movieName}`);
        const data = await response.json();
        res.status(200).json(data.Search);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const add_to_watchlist = async (req, res) => {
    try {
        const { username, imdbID, image, title } = req.body;
        const existingMovie = await MovieWatchList.findOne({ username, imdbID });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }
        const movie = await MovieWatchList.create({ username, imdbID, image, title });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const get_watchlist = async (req, res) => {
    try {
        const { username } = req.params;
        const watchlist = await MovieWatchList.find({ username });
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}   

const delete_from_watchlist = async (req, res) => { 
    try {
        const { imdbID } = req.params;
        const userId = req.user.userId;

        // Get the user's information to get their username
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the watchlist entry first
        const watchlistEntry = await MovieWatchList.findOne({ imdbID });
        
        if (!watchlistEntry) {
            return res.status(404).json({ message: 'Movie not found in watchlist' });
        }

        // Check if the authenticated user owns this watchlist entry
        if (watchlistEntry.username !== user.username) {
            return res.status(403).json({ message: 'You can only delete movies from your own watchlist' });
        }

        await MovieWatchList.deleteOne({ imdbID });
        res.status(200).json({ message: 'Movie removed from watchlist' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }   
}

const get_watchlist_all = async (req, res) => {
    try {
        const watchlist = await MovieWatchList.find();
        const data = await Promise.all(watchlist.map(async (movie) => {
            const userImage = await get_User(movie.username);
            return { ...movie.toObject(), userImage: userImage.image };
        }));
        const dataByUsername = data.reduce((acc, movie) => {
            acc[movie.username] = acc[movie.username] || [];
            acc[movie.username].push(movie);
            return acc;
        }, {});
        res.status(200).json(dataByUsername);    
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { get_Profile_ratings, get_all_profiles, search_movie, add_to_watchlist, get_watchlist, delete_from_watchlist, get_watchlist_all };
