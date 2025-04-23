const Movie = require('../models/Movie.js');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const get_Movies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({rating: -1});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const get_Movie = async (req, res) => {
    const { slug } = req.params;
    try {
        const movie = await Movie.findOne({ slug });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const get_User = async (req, res) => {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const userData = {
        username: user.username,
        image: user.image,
        id: user._id    
    }
    res.status(200).json(userData);
}

const post_Login = async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username or password are incorrect' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Username or password are incorrect' });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 3600000 });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const post_Register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) { 
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        res.status(200).json({ message: 'Registration successful' });   
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}



const post_Comment = async (req, res) => {  
    try {
        const findCommentUser = await Comment.findOne({ username: req.body.username, movieSlug: req.body.movieSlug });
        if (findCommentUser) {
            return res.status(400).json({ message: 'You have already submitted a review for this movie' });
        }
        const { rating } = req.body
        await Comment.create({
            ...req.body,
            rating: Number(rating)
        })
        res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const get_Comments = async (req, res) => {
    try {
        const comments = await Comment.find({ movieSlug: req.params.slug }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const delete_Comment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const post_Logout = async (req, res) => {
    try{
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    get_Movies, get_Movie, post_Comment, post_Login, get_User, post_Register, get_Comments, delete_Comment, post_Logout
}
