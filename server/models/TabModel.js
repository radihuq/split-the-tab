const mongoose = require('mongoose');

const TabSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    users: [],
    data: {
        info: {
            title: {
                type: String
            },
            description: {
                type: String
            },
            budget: {
                type: Number
            },
            public_id: {
                type: String,
                required: true
            }
        },
        users: [],
        feed: []
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Tab', TabSchema);