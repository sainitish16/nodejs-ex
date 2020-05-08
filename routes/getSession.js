var express = require('express');
var app = express();
var session = require('express-session');

app.all('/',function(req,res,next) {
    const userId = req.session.userId;
    var data = {
        data: userId
    }
    console.log(data);
    res.set('Content-Type', 'application/json');
    res.send(data)
    // if(userId){
    //     res.send({status:1});
    //     // res.redirect('http://localhost:3000/dashboard');
    // }else{
    //     res.status(200).send({status:0});
    // }
});

module.exports = app;