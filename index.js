const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const mongoose = require('mongoose');
const checkforAuthentication = require('./middlewares/authentication');


const app = express();
PORT  = 3000;

mongoose.connect("mongodb://localhost:27017/Blogify")
.then(() => {console.log("Connected to database")}) ;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render("home",{
        user: req.user,
        
    });
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkforAuthentication("token"));


app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});