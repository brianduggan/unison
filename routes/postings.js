var express = require('express');
var router = express.Router();
var Posting = require('../models/posting');

router.post('/new', function(req, res){
  console.log('creating post!');
  var newPost = new Posting(req.body);
  console.log("New Post: " + newPost);
  newPost.save(function(err, dbPost){
    res.json(dbPost);
  });
});

router.get('/', function(req,res){
  Posting.find({}, function(err, postings){
    res.json( { postings: postings } );
  }).populate('user_id');
});

router.delete('/:id', function(req, res){
  var postId = req.params.id;
  Posting.findByIdAndRemove(postId, function(err){
    res.status(204).end();
  })
});

module.exports = router;
