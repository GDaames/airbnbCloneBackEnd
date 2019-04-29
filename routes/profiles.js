const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Ad model
const Advert = require('../models/advert');

// Add route for user profiles
router.get('/advertise', ensureAuthenticated, (req, res) => {
    const account = req.user.account;

    //checks
    if(account == 'landlord') {
        res.render('post_ad', {
            name: req.user.name,
            account: req.user.account });
        console.log(account);
    } else
        res.render('view_ad', {
            name: req.user.name,
            account: req.user.account });
        console.log(account);
});

module.exports = router;