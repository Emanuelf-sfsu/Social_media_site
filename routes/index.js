var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPost = require('../middleware/postsMiddleware').getRecentPosts;
var db = require('../conf/database');
/* GET home page. */
router.get('/', getRecentPost, function(req, res, next) {

  res.render('index',{title:"Home"});
});

router.get('/login',(req, res , next) =>{
  res.render("login",{title:"login"});
})

router.get('/registration',(req, res , next) =>{
  res.render("registration",{title:"registration"});
})


router.use('/postimage', isLoggedIn);
router.get('/',isLoggedIn);

router.get('/postimage',(req, res , next) =>{
  res.render("postimage");
})

router.get("/post/:id(\\d+)",(req, res , next) =>{
  let baseSQL = 
  "SELECT u.username,p.title, p.description,p.photopath,p.created \
  FROM users u \
  JOIN posts p \
  ON u.id= fk_userid \
  WHERE u.id = ?;";

  let postId = req.params.id;
  db.execute(baseSQL,[postId])
  .then(([results,fields])=>{
    if(results && results.length){
      let post = results[0];
      console.log(post);
      res.render('imagepost', {currentPost: post});
    }else{
      req.flash('error','This is not the post your are looking for!');
      res.redirect('/');
    }
  })
  
})

module.exports = router;
