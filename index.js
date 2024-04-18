const path = require('path');
const express = require('express');

const userRoute = require('./routes/user');

const mongoose = require('mongoose');


const app = express();
PORT  = 3000;

mongoose.connect("mongodb://localhost:27017/Blogify")
.then(() => {console.log("Connected to database")}) ;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render("home");
})

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/user', userRoute);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});