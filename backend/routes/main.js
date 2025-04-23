const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');
const { signupLimiter, loginLimiter } = require('../middleware/rateLimitMiddleware.js');

router.get('/api/user', authMiddleware, mainController.get_User);
router.get('/api/movies', mainController.get_Movies);
router.get('/api/movies/:slug', mainController.get_Movie);
router.post('/api/login', loginLimiter, mainController.post_Login);
router.post('/api/register', signupLimiter, mainController.post_Register);
router.post('/api/comments/:slug', authMiddleware, mainController.post_Comment);
router.get('/api/comments/:slug', mainController.get_Comments);
router.delete('/api/comments/:id', authMiddleware, mainController.delete_Comment);
router.post('/api/logout', authMiddleware, mainController.post_Logout);
module.exports = router;

