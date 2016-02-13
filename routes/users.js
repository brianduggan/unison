var express = require('express');
var router = express.Router();
var User = require('../models/user');

// CREATES A USER
router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  console.log("this is the new user " + newUser);
  newUser.save(function(err, databaseUser){
    res.redirect('/');
  });
});

// LOGS A USER IN AND ASSIGNS A TOKEN
router.post('/authenticate', function(req, res){
  var username = req.body.username;
  console.log(req.body);
  var passwordTry = req.body.password;
  User.findOne({username: username}, function(err, dbUser){
    console.log(dbUser);
    dbUser.authenticate(passwordTry, function(err, isMatch){
      if(isMatch){
        dbUser.setToken(function(){
          res.json({
            description: 'password correct',
            user_id: dbUser._id,
            token: dbUser.token
          });
        });
      }
    });
  });
});

// GETS ALL USERS
router.get('/', function(req,res){
  User.find({}, function(err, users){
    res.json( { users: users } );
  });
})


router.get('/:id', function(req,res){
  var userId = req.params.id;
  console.log(userId)
  User.find({'_id': userId}, function(err, user){
    res.json({user: user})
  })
})

router.get('/taco', function(req, res) {
  var request = require('request');
  var parseString = require('xml2js').parseString;
  var game = req.query.name;
  var xml = 'https://www.boardgamegeek.com/xmlapi2/search?query='+ game;
  var gameId = 0;
  request(xml, function(err, response, body){
    parseString(body, function(err, result){
      if(result.items && result.items.item[0]){
        gameId = result.items.item[0].$.id; //Should make it so multiple results come up
        var results = result.items.item;
        var fiveResults = [];
        for (var i = 0; i < 5; i++) {
          if (results[i]){
            var resultObj = {id: results[i].$.id, name: results[i].name[0].$.value}
            fiveResults.push(resultObj);
          } else {
            i = 5;
          }
        }
        var finalResults = [];
        fiveResults.forEach(function(result){
          var xml2 =  'https://www.boardgamegeek.com/xmlapi2/thing?=boardgame&id='+result.id+'&stats=1';
          console.log(result.id);

          request(xml2, function(err2, response2, body2){
            parseString(body2, function(err2, result2){
              console.log(result2);
              finalResults.push(result2);
              console.log("This is Final "+finalResults);
              if (finalResults.length === fiveResults.length){
                console.log("All Done!");
                res.json(finalResults);
              } // end if
            }); // end parseString
          }); // end request
        }); // end forEach
      } else { res.json("Hi");} // end if
      console.log(finalResults.length);
    });
  });


});


module.exports = router;
