var express = require('express');
var router = express.Router();
var connection = require('../mysql/mysqlConnect');

router.post('/',(req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var contactDesc = req.body.desc;
    var phone = req.body.phone;
    var cat = req.body.cat;
    var dateEvent = req.body.dateEvent; 
    var location  = req.body.location;

    if(name != null && email != null){
        console.log(email);
        var sql = "INSERT INTO `contact` (`id`, `name`, `email`,`contactDesc`,`phone`,`cat`,`dateevent`,`location`) VALUES (NULL, '"+name+"', '"+email+"','"+contactDesc+"','"+phone+"','"+cat+"','"+dateEvent+"','"+location+"'); "
        console.log(sql)
        connection.query(sql,(err,result)=>{
            if(err) {
                var data = {
                    "formStatus" : 0
                };
                res.send({data: data});
                throw err;
            }
        })
        var data = { 
            "formStatus" : 1
        };
        res.send({data: data});
    }else{
        var data = {
            "formStatus" : 0
        };
        res.send({data: data});
        console.log("Name Was NULL");
    }
    // res.redirect("http://localhost:3000/contact");
});

module.exports = router;