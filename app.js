const express=require('express');
const bodyParser=require('body-parser');
const Router=require('./router/user.js');
var app=express();
app.listen(8080);
app.use(bodyParser.urlencoded({
extended:false
}));
app.use(express.static('public'));
app.use('/user',Router);