const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;