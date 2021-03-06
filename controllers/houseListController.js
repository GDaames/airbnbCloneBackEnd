const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const House = mongoose.model('HouseListing');

router.get('/', (req, res) => {
    res.render("house/main.hbs", {
        viewTitle: "List House"
    });
});


router.post('/', (req, res) => {
	if (req.body._id == '')
        insertHouse(req, res);
    else
    	updateHouse(req, res);
});

function insertHouse(req, res) {
	console.log('function loaded');
    var house = new House();
    house.HouseType = req.body.HomeType;
    house.RoomType = req.body.RoomType;
    house.Accommodates = req.body.Accommodates;
    house.City = req.body.City;
    house.Calendar.push({ Start: req.body.Calendar[0], End: req.body.Calendar[1]});
	house.Title = req.body.Title;
	house.Price = req.body.Price;
	house.Summary = req.body.Summary;
	house.Beds = req.body.Beds;
	house.Bathrooms = req.body.Bathrooms;
	house.Location = req.body.Location;
	house.Bedrooms = req.body.Bedrooms;
    house.save((err, doc) => {
        if (!err)
            res.redirect('/houseList/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("house/main.hbs", {
                    viewTitle: "List House",
                    house: req.body,
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    House.find((err, docs) => {
        if (!err) {
            res.render("house/listhouse.hbs", {
                list: docs
            });
            console.log(docs);
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    House.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("house/main.hbs", {
                viewTitle: "Update House",
                house: doc
            });
        }
    });
});

function updateHouse(req, res) {
    House.findOneAndUpdate(
    	{"_id": req.body._id},
    	{
    		HouseType : req.body.HomeType,
    		RoomType : req.body.RoomType,
    		Accommodates : req.body.Accommodates,
    		City : req.body.City,
			Title : req.body.Title,
			Price : req.body.Price,
			Summary : req.body.Summary,
			Beds : req.body.Beds,
			Bathrooms : req.body.Bathrooms,
			Location : req.body.Location,
			Bedrooms : req.body.Bedrooms,
			"Calendar" : {Start: req.body.Calendar[0], End: req.body.Calendar[1]}
		}
    	).then(function (post) {
		res.redirect('houseList/list');
    });
}

router.get('/delete/:id', (req, res) => {
    House.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
        	res.redirect('/houseList/list');
        }
        else
        {
        	console.log(err);
        }
    });
});



function handleValidationError(err, body) {
	console.log('Error during record insertion : ' + err);
}

module.exports = router;
