require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const mongoose = require('./db/conn');
const router = require('./routers/route');

//console.log(process.env.SECRET_KEY);

//const UserData = require('./models/users');
//Following code will be used If we need to access static index.html page inside public folder
const static_path = path.join(__dirname,'../public');
console.log(static_path);
router.use(express.static(static_path));

const tempate_path = path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');
app.set('view engine','hbs');
app.set('views',tempate_path);
hbs.registerPartials(partials_path);
app.use(express.urlencoded({ extended: true }));

app.use(router); 

app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
});