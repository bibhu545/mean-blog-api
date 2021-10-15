const mongoose = require('mongoose');
const { ActiveStatus } = require('../Common/utils');

const CommentModel = mongoose.Schema({
    commentBody: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Number,
        required: true,
        default: ActiveStatus.Active
    },
    commentedOn: {
        type: Date,
        require: true,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', CommentModel);
module.exports = Comment;