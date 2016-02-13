Handlebars.registerHelper('deleteMe', function(element){
  var cookie = $.cookie('user_id');
  console.log(element)
  if (cookie === element.user_id._id){
    var el = new Handlebars.SafeString('<a href="#" class="update-posting"><span class="font-awesome-icon">&#xf062;</span>Update</a><a href="#" class="delete-posting" data-post-id="'+element._id+'"><i class="fa fa-minus-circle"></i>Delete</a>')
    console.log(el);
    return el
  }
})

Handlebars.registerHelper('updateMe', function(element){
  var cookie = $.cookie('user_id');
  if (cookie === element.user_id._id){
    var el = new Handlebars.SafeString('<form class="update-post-form" data-post-id="'+element._id+'"><input type="text" name="game" placeholder="Game" value="'+element.game+'" required><input type="text" name="locationName" placeholder="Place Name" value="'+element.locationName+'" required><input type="text" name="location" placeholder="Location" value="'+element.location+'" required><input type="text" name="players" placeholder="Players Needed" value="'+element.players+'" required><input type="submit" value="Update Post"></form>')
    console.log(el);
    return el
  }
})

Handlebars.registerHelper('capitalize', function(words){
  var wordArray = words.split("");
  var firstLetterCap = words.split(" ")[0].split("")[0].toUpperCase();
  wordArray[0] = firstLetterCap;
  return wordArray.join('');
})

//////// LOG-IN FUNCTIONALITY ////////
function logIn(usernameTry, passwordTry, callback){
  $.ajax({
    method: 'post',
    url: '/users/authenticate',
    data: {username: usernameTry, password: passwordTry},
    success: function(data){
      $.cookie('token', data.token);
      $.cookie('user_id', data.user_id);
      callback();
    }
  });
}

function logInHandler(){
  $('form#log-in-form').on('submit', function(e){
    e.preventDefault();
    var $usernameField = $(this).find('input[name="username"]');
    var usernameValue = $usernameField.val();
    var $passwordField = $(this).find('input[name="password"]');
    var passwordValue = $passwordField.val();
    logIn(usernameValue, passwordValue, function(){
      console.log('The token is: '+ $.cookie('token') + '\nThe user id is: '+ $.cookie('user_id'));
      handlebarsPost();
      getAllUsers();
      masterMapDisplayer();
      $('.logged-in').show();
      $('.logged-out').hide();
      $('.log-toggle').hide();
    });
  });
}

function logOutHandler(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
    $.removeCookie('user_id');
    location.reload();
  })
}

function onloadGetter(){
  if ($.cookie('token')){
    $('.logged-in').show();
    $('.logged-out').hide();
    $('.log-toggle').hide();
  } else {
    $('.logged-in').hide();
    $('.logged-out').show();
    $('.log-toggle').hide();
  }
}


function displayPostInfoResults(response){
  var $infoDiv = $('.game-info');
  $infoDiv.empty();
  response.forEach(function(result){
    var mainDestination = result.items.item[0];
    var $el = $('<li>');
    var gameId = result.items.item[0].$.id;
    var gameName = mainDestination.name[0].$.value;
    console.log(gameName);
    $el.append( $('<h2>').text(gameName) );
    $el.append( $('<a href="https://boardgamegeek.com/boardgame/'+gameId+'/">').text( gameName + " on Board Game Geek"));
    $infoDiv.append($el);
  })
};

function postInfoHandler(){
  $('.post-games').on('click', '.get-info', function(e){
    e.preventDefault();
    var $self = $(this);
    var $infoDiv = $('.game-info');
    $infoDiv.append( "LOADING!!!" );
    var nameGame = $self.data('name');
    $.ajax({
      method: 'get',
      url: '/users/taco',
      data: {name: nameGame},
      success: function(response){
        displayPostInfoResults(response);
      }
    })
  })
}

function getMapHandler(){
  $('.post-games').on('click', '.get-location', function(e){
    e.preventDefault();
    var location = $(this).parent().find('.map-location').text();
    console.log(location)
    centerMap(location);
  })
}

function displayAllUsers(users){
  var allUsers = users;
  console.log(users);
  $usersDiv = $('#all-users');
  $usersDiv.empty();
  $usersDiv.append( $('<h2>').text("Unison Users") );
  allUsers.forEach(function(user){
    var cookieToken = $.cookie('user_id');
    if (cookieToken !== user._id ){
      console.log(user._id);
      var $userDiv = $('<div>');
      $userDiv.append( $('<h3>').text(user.username) );
      $usersDiv.append( $userDiv )
    }
  });
}

// GET ALL USERS
function getAllUsers(){
  $.ajax({
    method: 'get',
    url: '/users',
    success: function(response){
      displayAllUsers(response.users);
    }
  })
}

function masterMapDisplayer(){
  $.ajax({
    method: 'get',
    url:'/postings',
    success: function(response){
      masterMap(response)
    }
  })
}

function handlebarsPost(){
  $('.post-games').empty();
  $.getJSON('/postings', function(data){
      var source = $('#posts').html();
      console.log(data);
      var template = Handlebars.compile(source);
      var posts = data;
      var compiledHTML = template(posts);
      $('.post-games').append(compiledHTML);
  });
}

function usersDisplayHandler(){
  $('.users-link').on('click', function(){
    $('#all-users').toggle();
  })
}

function addPostDisplayHandler(){
  $('.post-link').on('click', function(){
    $('.add-post').toggle();
  })
}

function createAccountHandler(){
  $('.drop-account').on('click', function(e){
    e.preventDefault();
    $('#log-in').slideToggle();
    $('#create-account').slideToggle();
  })
}

function signInHandler(){
  $('.go-to-log').on('click', function(e){
    e.preventDefault();
    $('#log-in').slideToggle();
    $('#create-account').slideToggle();
  })
}

function profileLinkHandler(){
  $('.profile-link').on('click', function(){
    var userId = $.cookie('user_id');
    $.ajax({
      method: 'get',
      url: '/users/' + userId,
      success: function(response){
        var source = $('#update-profile-template').html();
        var template = Handlebars.compile(source);
        var user = response.user[0];
        var compiledHTML = template(user);
        $('.update-profile-container').empty();
        $('.update-profile-container').append(compiledHTML);
        $('.update-profile-container').toggle();
      }
    })
  });
}




$(function(){

  logInHandler();
  logOutHandler();
  onloadGetter();
  postInfoHandler();
  getMapHandler();
  getAllUsers();
  masterMapDisplayer();
  handlebarsPost();
  usersDisplayHandler();
  addPostDisplayHandler();
  createAccountHandler();
  signInHandler();
  profileLinkHandler();

});

//
