const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

entrySchema.index({ user: 1, tournament: 1 }, { unique: true });

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;