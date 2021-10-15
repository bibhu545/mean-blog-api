const { showErrorMessage, ActiveStatus } = require('../Common/utils');
const Category = require('../models/categoryModels');
const Post = require('../models/postModel');
const User = require('../models/UserModel');
const CommentModel = require('../models/commentModel');

const multer = require('multer');
const mongoose = require('mongoose');
const Router = require('express').Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../assets/uploads/ckeditor')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('upload');

Router.post('/ckupload', (req, res, next) => {
    upload(req, res, function (err) {
        let baseUrl = req.protocol + '://' + req.get('host') + '/uploads/ckeditor/' + req.file.filename;
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            url: baseUrl
        });
    });
});

Router.post('/fetch-all', (req, res, next) => {
    let filter = {
        isActive: ActiveStatus.Active.toString()
    };
    let categoryId = req.body.category;
    if (categoryId) {
        filter = {
            ...filter,
            category: mongoose.Types.ObjectId(categoryId)
        }
    }
    let authorId = req.body.author;
    if (authorId) {
        filter = {
            ...filter,
            author: mongoose.Types.ObjectId(authorId)
        }
    }
    Post.aggregate([
        { $match: filter },
        { $lookup: { from: User.collection.name, localField: "author", foreignField: "_id", as: "authorDetails" } },
        { $lookup: { from: Category.collection.name, localField: "category", foreignField: "_id", as: "categoryDetails" } }
    ]).then(data => {
        res.status(200).json({
            data
        });
    }).catch(err => {
        showErrorMessage(res, 500, "Some error occured fetching story. Please try again");
    })
})

Router.post('/fetch', (req, res, next) => {
    let filter = {
        isActive: ActiveStatus.Active.toString(),
        _id: mongoose.Types.ObjectId(req.body.postId)
    };
    Post.aggregate([
        { $match: filter },
        { $lookup: { from: User.collection.name, localField: "author", foreignField: "_id", as: "authorDetails" } },
        { $lookup: { from: Category.collection.name, localField: "category", foreignField: "_id", as: "categoryDetails" } }
    ]).then(data => {
        if (data) {
            res.status(200).json({
                data
            });
        }
        else {
            showErrorMessage(res, 404, "Requested story does not exists.");
        }
    }).catch(err => {
        showErrorMessage(res, 500, "Some error occured fetching story. Please try again");
    });
})

Router.post('/create', (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        category: req.body.categoryId,
        author: req.body.authorId,
        readingTime: req.body.readingTime,
        body: req.body.body,
        disableComments: req.body.disableComments,
        isFeatured: req.body.isFeatured
    });
    Post.create(newPost).then(data => {
        res.status(200).json({
            data,
            message: "Successfully added new story."
        });
    }).catch(err => {
        showErrorMessage(res, 500, "Some error occured adding new story. Please try again");
    });
})

Router.post('/edit', (req, res, next) => {
    let postId = req.body.postId;
    let updatedPost = {
        title: req.body.title,
        category: req.body.category,
        readingTime: req.body.readingTime,
        body: req.body.body,
        disableComments: req.body.disableComments,
        isFeatured: req.body.isFeatured
    };
    Post.findOneAndUpdate({ _id: postId }, { $set: updatedPost }).then(data => {
        res.status(200).json({
            data,
            message: "Updated successfully."
        });
    }).catch(err => {
        showErrorMessage(res, 500, "Some error occured updating story. Please try again");
    });
})

Router.post('/add-comment', (req, res, next) => {
    let commentModel = CommentModel({
        commentBody: req.body.commentBody,
        post: req.body.post,
        user: req.body.user
    });
    CommentModel.create(commentModel).then(data => {
        res.status(200).json(
            commentModel
        );
    }).catch(error => {
        showErrorMessage(res, 500, "Some error occured adding comment. Please try again");
    });
})

Router.post('/fetch-comments', (req, res, next) => {
    let filter = {
        post: mongoose.Types.ObjectId(req.body.postId),
        isActive: ActiveStatus.Active
    };
    console.log(filter)
    CommentModel.aggregate([
        { $match: filter },
        { $lookup: { from: User.collection.name, localField: "user", foreignField: "_id", as: "userDetails" } },
    ]).then(data => {
        res.status(200).json(
            data
        );
    }).catch(error => {
        showErrorMessage(res, 500, "Some error occured while fetching comments. Please try again");
    });
})

module.exports = Router;
