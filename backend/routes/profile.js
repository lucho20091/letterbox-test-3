const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

router.get('/api/profile/:username', profileController.get_Profile_ratings);
router.get('/api/profiles', profileController.get_all_profiles);
router.get('/api/search/:title', authMiddleware, profileController.search_movie);
router.post('/api/watchlist', authMiddleware, profileController.add_to_watchlist);
router.get('/api/watchlist/:username', profileController.get_watchlist);
router.delete('/api/watchlist/:imdbID', authMiddleware, profileController.delete_from_watchlist);
router.get('/api/watchlist', profileController.get_watchlist_all);
module.exports = router;

    