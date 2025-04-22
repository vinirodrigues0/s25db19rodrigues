const mongoose = require('mongoose');
const tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    year: Number,
    location: String
});

module.exports = mongoose.model("Tournament", tournamentSchema);