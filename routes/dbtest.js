const express = require('express');
const router = express.Router();
const db = require('../conf/database');

router.get('/getAllUsers', (req,res,next)=>{

    //db.query & db.execute are two statement that you will be using.
    db.query('SELECT * from users;', (err, results, fields)=>{
        console.log(results);
        res.send(results);
    });
});

router.get('/getAllPosts', (req,res,next)=>{

    //db.query & db.execute are two statement that you will be using.
    db.query('SELECT * from posts;', (err, results, fields)=>{
        console.log(results);
        res.send(results);
    });
});
module.exports = router;
//testing