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
      usernameDisplay();
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
  });
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
  var $main = $('.game-info');
  $main.empty();
  var $infoDiv = $('<div class="modal-container panel panel-default">');
  var $modalHeader = $('<div class="panel-heading close-modal">').text("X");
  var $infoBody = $('<div class="panel-body">');
  $main.append($infoDiv);
  $infoDiv.append($modalHeader);
  $infoDiv.append($infoBody);
  response.forEach(function(result){
    var mainDestination = result.items.item[0];
    var $el = $('<div>');
    var gameId = result.items.item[0].$.id;
    var minPlay = mainDestination.minplayers[0].$.value;
    var maxPlay = mainDestination.maxplayers[0].$.value;
    var description = mainDestination.description[0];
    var age = mainDestination.minage[0].$.value;
    console.log(mainDestination);
    var gameName = mainDestination.name[0].$.value;
    $el.append( $('<h3>').text(gameName) );
    $el.append( $('<span class="font-awesome-icon expand">').html('&#xf18e;'));
    var $content = $('<div class="game-details">');
    $el.append($content);
    $content.append( $('<p>').html("Description: " + description) )
    $content.append( $('<p>').text("Players: " + minPlay + "-" + maxPlay) );
    $content.append( $('<p>').text("Suggested Age: " + age + "+" ) );
    $content.append( $('<a href="https://boardgamegeek.com/boardgame/'+gameId+'/">').text( gameName + " on Board Game Geek"));
    $infoBody.append($el);
  })
};

function closeModal(){
  $('.game-info').on('click', '.close-modal', function(e){
    $('.game-info').hide();
  })
};

function expandInfo(){
  $('.game-info').on('click', '.expand', function(){
    var info = $(this).next();
    info.slideToggle();
  })
}

function postInfoHandler(){
  $('.post-games').on('click', '.get-info', function(e){
    e.preventDefault();
    var $self = $(this);
    $('.game-info').show();
    var nameGame = $self.data('name');
    $.ajax({
      method: 'get',
      url: '/users/taco/fluffybunny',
      data: {name: nameGame},
      success: function(response){
        console.log(response);
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
  var $usersDiv = $('#all-users');
  $usersDiv.empty();
  $usersDiv.append( $('<div class="panel-heading">').append($('<h2>').text("Unison Users")) );
  var $usersBody = $('<div class="panel-body">');
  $usersBody.appendTo($usersDiv);
  allUsers.forEach(function(user){
    var cookieToken = $.cookie('user_id');
    if (cookieToken !== user._id ){
      // $.get('/users/'+cookieId, function(response){
      //   var currentUser = response;
      // })
      console.log(user._id);
      var $user = $('<div>');
      $user.append( $('<h3>').text(user.username) );
      $user.append( $('<a href="#" data-user-id="'+user._id+'" class="show-profile">').text('Profile') )
      $user.append( $('<a href="#" data-user-id="'+user._id+'" class="add-friend">').text('Add to Friends List') );
      $usersBody.append( $user )
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

function getOtherUserProfile(){
  $('#all-users').on('click', '.show-profile', function(e){
    e.preventDefault();
    var userId = $(this).data('user-id');
    $.ajax({
      method: 'get',
      url: '/users/' + userId,
      success: function(response){
        var userPro = response.user[0];

      }
    })
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
    $('#all-users').show();
    $('#map-container').hide();
    $('.post-games').hide();
    $('.update-profile-container').hide();
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

function displayProfile(){
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
    }
  })
}

function profileLinkHandler(){
  $('.profile-link').on('click', function(){
    displayProfile();
    $('.update-profile-container').show();
    $('#map-container').hide();
    $('.post-games').hide();
    $('#all-users').hide();
  });
}

function updateProfile(){
  $('.update-profile-container').on('submit', 'form.update-profile-form', function(e){
    e.preventDefault();
    var $email = $(this).find('input[name="email"]');
    var emailVal = $email.val();
    var $favGames = $(this).find('input[name="favoriteGames"]');
    var favGamesVal = $favGames.val();
    var $birth = $(this).find('input[name="birthdate"]');
    var birthVal = $birth.val();
    var profile = {email: emailVal, favoriteGames: favGamesVal, birthdate: birthVal};
    var userId = $(this).data('user-id');
    console.log(profile);
    console.log(userId);
    $.ajax({
      method: 'patch',
      data: profile,
      url: '/users/' + userId,
      success: function(response){
        displayProfile();
      }
    })
  })
}

function homeLinkHandler(){
  $('.home-link').on('click', function(req,res){
    $('.post-games').show();
    $('#map-container').show();
    $('.update-profile-container').hide();
    $('#all-users').hide();
  })
}

function usernameDisplay(){
  if ($.cookie('user_id')){
    var id = $.cookie('user_id');
    var url = '/users/'+id;
    console.log(url);
    $.ajax({
      method: 'get',
      url: url,
      success: function(response){
        $('.username-display').text(response.user[0].username)
      }
    })
  }
}


function addFriendHandler(){
  $('#all-users').on('click', '.add-friend', function(e){
    e.preventDefault();
    var friendId = $(this).data('user-id');
    var userId = $.cookie('user_id');
    console.log(friendId, userId);
    var friendData = {friend: friendId};
    $.ajax({
      method: 'put',
      url: '/users/'+ userId,
      data: friendData,
      success: function(response){
        console.log(response)
      }
    })
  })
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
  updateProfile();
  getOtherUserProfile();
  homeLinkHandler();
  usernameDisplay();
  addFriendHandler();
  closeModal();
  expandInfo();
});

//
