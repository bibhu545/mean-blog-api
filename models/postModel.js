const mongoose = require('mongoose');
const { ActiveStatus } = require('../Common/utils');

const PostModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    readingTime: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    disableComments: {
        type: Boolean,
        required: true,
        default: false
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addedOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    isActive: {
        type: String,
        required: true,
        default: ActiveStatus.Active
    }
})

const Post = mongoose.model("Post", PostModel);
module.exports = Post;