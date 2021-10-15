const mongoose = require('mongoose');
const { ActiveStatus } = require('../Common/utils');

const CategoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        required: true,
        default: ActiveStatus.Active
    },
})

const Category = mongoose.model('Category', CategoryModel);
module.exports = Category
