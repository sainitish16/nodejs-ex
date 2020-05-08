var express = require('express');
var router = express.Router();
var conn = require('../mysql/mysqlConnect');
var Crypto = require('crypto');
var session = require('express-session');
var app = express();

app.post('/', (req,res) => {
    var username = req.body.username
    
    var pwd = req.body.password;
    var password = Crypto.createHash('md5').update(pwd).digest('hex')
    conn.query("SELECT * FROM `admin` WHERE `username` = '"+username+"' AND `password` = '"+password+"'",(err,result)=>{
        if(err) throw err;
        req.session.userId = username;
        res.send(JSON.stringify(result));
    });
})

module.exports = app;