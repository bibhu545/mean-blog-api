const Category = require('../models/categoryModels');
const { showErrorMessage } = require('../Common/utils');
const Router = require('express').Router();

Router.get('/', (req, res, next) => {
    Category.find().then(data => {
        return res.status(200).json({
            data
        });
    }).catch(err => {
        showErrorMessage(res, 500, "Some error occured while fetching categories.");
    });
});

module.exports = Router