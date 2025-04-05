const express = require('express');
const router = express.Router();

const createPost = require('../controllers/post.controller');

router.route('/post').post(createPost);

module.exports = router;