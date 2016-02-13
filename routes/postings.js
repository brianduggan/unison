var express = require('express');
var router = express.Router();
var Posting = require('../models/posting');

router.post('/new', function(req, res){
  var newPost = new Posting(req.body);
  newPost.save(function(err, dbPost){
    res.json(dbPost);
  });
});

router.get('/', function(req,res){
  Posting.find({}, function(err, postings){
    res.json( { postings: postings } );
  }).populate('user_id');
});

router.patch('/:id', function(req, res){
  var postId = req.params.id;
  var body = req.body;
  Posting.findByIdAndUpdate(postId, body, function(err, posting){
    res.json( {posting: posting});
  })
})

router.delete('/:id', function(req, res){
  var postId = req.params.id;
  Posting.findByIdAndRemove(postId, function(err){
    res.status(204).end();
  })
});

module.exports = router;
