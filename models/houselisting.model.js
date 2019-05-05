const mongoose = require('mongoose');

var Dates = new mongoose.Schema({
    Start: {
        type: String,
    },
    End: {
        type: String,
    }
});

var Photos = new mongoose.Schema({
    NamePhoto: {
        type: String,
    }
});

var houseSchema = new mongoose.Schema({
    HouseType: {
        type: String,
    },
    RoomType: {
        type: String,
    },
    Accommodates: {
        type: Number,
    },
    City: {
        type: String,
    },
    Calendar: [Dates],
    Price: {
        type: Number,
    },
    Title: {
        type: String,
    },
    Summary: {
        type: String,
    },
    Photos: [Dates],
    Bedrooms: {
        type: String,
    },
    Beds: {
        type: Number,
    },
    Bathrooms: {
        type: Number,
    },
    Location: {
        type: String,
    },
});

mongoose.model('HouseListing', houseSchema)
