const { red } = require('colors');
var express = require('express');
const { request } = require('../app');
var router = express.Router();
var db = require('../conf/database');
const{successPrint,errorPrint} = require('../helpers/debug/debugprinters');
const UserError =require('../helpers/error/UserError');


/*Test Route*/
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.password;
  /*
    Do server side validation here.
  */

  db.execute("SELECT * FROM users WHERE username=?", [username])
    .then(([results, fields]) => {
      if (results && results.length == 0){
        return db.execute("SELECT * FROM users WHERE email=?", [email]);

      }else { 
        throw new UserError(
          "Registration Failed Username already exists",
          "/registration",
          200
        );
      }
    })
    .then(([results, fields])=>{
      if (results && results.length == 0) {
          let baseSQL = "INSERT INTO users (username,email,password,created) VALUES(?,?,?,now());"
          return db.execute(baseSQL,[username,email,password])
      } else {
        throw new UserError(
          "Registration Failed Email already exists",
          "/registration",
          200
        );
      }

    })
    .then(([results, fields])=>{
      if(results && results.affectedRows==1){
        successPrint("USer.js --> was created!!");
        req.flash('success','User Account has been created.')
        res.redirect('/login'); 
      }else{
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      }
    })
      .catch((err)=>{
        errorPrint("user could not be made", err);
        if(err instanceof UserError){
          errorPrint(err.getMessage());
          req.flash('error', err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        }else{
          next(err);
        }
      })
});

//Login Route
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  
  //Validation here

  let baseSQL = "SELECT id,username, password FROM users WHERE username=? AND password=?;"
  let userId;
  db.execute(baseSQL,[username,password])
  .then(([results, fields])=>{
    if(results && results.length == 1){
      userId = results[0].id;
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = userId;
      res.locals.logged = true;
      req.flash('success','You have been successfully logged in!');
      res.redirect("/");
    }else{
      throw new UserError("Invaild username and/or password","/login",200);
    }
  })
  .catch((err)=>{
    errorPrint("user login failed");
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    }else{
      next(err);
    }
  })
  
});


//log out

router.post('/logout' ,(req, res, next) =>{
  req.session.destroy((err)=>{
    if(err){
      errorPrint("Session could not be destroyed");
      next(err);
    }else{
      successPrint('session was destroyed')
      res.clearCookie('csid');
      res.json({status: "OK", message: "User is logged out"});
    }
  })
});

















module.exports = router;
