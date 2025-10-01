const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    status: {
        type: String,
        enum: ['reading', 'completed', 'wishlist'],
        default: 'reading'
    },
    startedAt: {
        type: Date,
        default: Date.now
    }
});

userBookSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('UserBook', userBookSchema);
