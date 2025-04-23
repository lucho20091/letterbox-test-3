require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
connectDB();

const app = express();

// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

app.use('/', require('./routes/main.js'));
app.use('/', require('./routes/profile.js'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
