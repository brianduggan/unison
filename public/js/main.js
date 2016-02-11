Handlebars.registerHelper('cookie', function(element){
  var cookie = $.cookie('user_id');
  console.log(element)
  if (cookie === element.user_id._id){
    var el = new Handlebars.SafeString('<a href="#" class="delete-posting" data-post-id="'+element._id+'">Delete Me</a>')
    console.log(el);
    return el
  }
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
  $('form#log-in').on('submit', function(e){
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
      $('form#log-in').hide();
      $('form#create-user').hide();
      $('#log-out').show();
      $('.add-post').show();
      $('.post-games').show();
      $('#all-users').show();
      $('#map').show();
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
  if ($.cookie('token')){ // Refactor Later... give things that should be visible on sign in a similar class
    $('form#log-in').hide();
    $('form#create-user').hide();
    $('.add-post').show();
    $('.post-games').show();
    $('#map').show();
  } else { // Refactor Later... give things that should be visible on sign in a similar class
    $('form#log-in').show();
    $('form#create-user').show();
    $('#log-out').hide();
    $('.add-post').hide();
    $('.post-games').hide();
    $('#all-users').hide();
    $('#map').hide();
  }
}



// function renderPosts(postings){
//     var posts = postings.postings;
//     var $container = $('ul#post-list');
//     $container.empty();
//     // IN POSTS.EACH... ADD AN IF COOKIETOKEN !== POST.USER_ID.ID... THEN DISPLAY MAKE FRIEND OPTION
//     posts.forEach(function(post){
//       console.log(post);
//       var $el = $('<li>');
//       $el.append( $('<h4>').text(post.game) );
//       $el.append( $('<a href="#" class="get-info" data-name="'+post.game+'">').text("Get some info on this game"));
//       if (post.user_id){
//         $el.append( $('<h4>').text(post.user_id.username) );
//         $el.append( $('<h5>').text(post.location) );
//       }
//       if(post.location){
//         $el.append( $('<a href="#" class="get-location">').text("Get Location") );
//       }
//       var cookieToken = $.cookie('user_id');
//       if (cookieToken === post.user_id._id){ /////FIX THIS!!!!!!!!!!!!!!!!!!
//         $el.append( $('<a href="#" class="delete-posting" data-post-id="'+post._id+'">').text("Delete Me") );
//       }
//       var $infoDiv = $('<div class="game-info">');
//       $container.append($el);
//       $el.append($infoDiv);
//     })
// }


function newPostHandler(){
  $('form#new-post').on('submit', function(e){
    e.preventDefault();
    var userId = $.cookie('user_id');
    var $gameField = $(this).find('input[name="game"]');
    var gameValue = $gameField.val();
    var $locationField = $(this).find('input[name="location"]');
    var locationValue = $locationField.val();
    var postingData = {game: gameValue, location: locationValue, user_id: userId};
    $.ajax({
      method: 'post',
      url: '/postings/new',
      data: postingData,
      success: function(){
        handlebarsPost();
        masterMapDisplayer();
      }
    })
    $gameField.val("");
    $locationField.val("");
  });
}


function displayPostInfoResults(response, div){
  var $infoDiv = div.parent().find('.game-info');
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
    var $infoDiv = $self.parent().find('.game-info');
    $infoDiv.append( "LOADING!!!" );
    var nameGame = $self.data('name');
    $.ajax({
      method: 'get',
      url: '/users/taco',
      data: {name: nameGame},
      success: function(response){
        displayPostInfoResults(response, $self);
      }
    })
  })
}

function deletePostsHandler(){
  $('.post-games').on('click', '.delete-posting', function(e){
    e.preventDefault();
    console.log("Hello There Deleter");
    var postId = $(this).data('post-id');
    console.log(postId);
    $.ajax({
      method: 'delete',
      url: '/postings/' + postId,
      success: function(){
        handlebarsPost();
      }
    })
  })
}

function getMapHandler(){
  $('.post-games').on('click', '.get-location', function(e){
    e.preventDefault();
    var location = $(this).prev().text();
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



$(function(){

  logInHandler();
  logOutHandler();
  onloadGetter();
  newPostHandler();
  postInfoHandler();
  deletePostsHandler();
  getMapHandler();
  getAllUsers();
  masterMapDisplayer();
  handlebarsPost();

});

//
