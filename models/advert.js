const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Advert =  mongoose.model('Advert', advertSchema);

module.exports = Advert;