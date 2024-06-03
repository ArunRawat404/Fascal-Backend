const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true,
        enum: ['public', 'private']
    },
    movies: [
        {
            title: String,
            year: String,
            imdbID: String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const List = mongoose.model('List', listSchema);

module.exports = List;
