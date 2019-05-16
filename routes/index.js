const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Advert model
const Advert = require('../models/advert');

// Welcome
router.get('/', (req, res) => res.render('Welcome.ejs'));

// router.get('/', (req, res) => {
//     Advert.find({}, function(err, adverts){
//         if(err){
//             console.log(err);
//         } else {
//           res.render('Welcome', {
//               title: 'Available Rooms',
//               adverts: 'adverts',
//               name: req.user.name 
//           });
//         }
//     });
// });

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard.ejs', {
        name: req.user.name,
        account: req.user.account
    }));

module.exports = router;
