const { ActiveStatus } = require('../Common/utils');
const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        required: true,
        default: ActiveStatus.Active
    },
    joinedAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    lastLogin: {
        type: Date,
        require: true,
        default: new Date()
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserModel);

module.exports = User