const mongoose = require('mongoose');
const tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2100
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Tournament", tournamentSchema);