const express = require('express');
const router = express.Router();

//Login PAge
router.get('/login', (req, res) => res.send('Login'));

//Register PAge
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;