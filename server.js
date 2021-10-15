const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const categoryRoutes = require('./routes/categoryRoutes');
const accountRoutes = require('./routes/accountRoutes');
const postRoutes = require('./routes/postRoutes');

mongoose.connect('mongodb+srv://blogUser:TI1HcEPeVqtjHDEc@common.eik60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/uploads/ckeditor', express.static(__basedir + '/uploads/ckeditor'));
app.use('/categories', categoryRoutes);
app.use('/account', accountRoutes);
app.use('/post', postRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server started at ${port}`);
});
