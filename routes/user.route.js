const express = require('express');
const router = express.Router();

const { register } = require('../controllers/user.controller');

router.post('/register', register);
// router.route('/register').post(register);
// Uses route chaining — useful if you're handling multiple methods (.get(), .put(), etc.) on the same path.


module.exports = router;