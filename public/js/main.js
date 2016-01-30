console.log("Hello!");

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
    console.log(usernameValue+ " "+passwordValue);
    logIn(usernameValue, passwordValue, function(){
      console.log('The token is: '+ $.cookie('token') + '\nThe user id is: '+ $.cookie('user_id'));
      $('form#log-in').hide();
      $('form#create-user').hide();
      $('#log-out').show();
      $('.add-post').show();
      $('.all-posts').show();
    });
  });
}

function logOutHandler(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
    location.reload();
  })
}

function onloadGetter(){
  if ($.cookie('token')){ // Refactor Later... give things that should be visible on sign in a similar class
    $('form#log-in').hide();
    $('form#create-user').hide();
    $('.add-post').show();
    $('.all-posts').show();
  } else { // Refactor Later... give things that should be visible on sign in a similar class
    $('form#log-in').show();
    $('form#create-user').show();
    $('#log-out').hide();
    $('.add-post').hide();
    $('.all-posts').hide();
  }
}

function getPosts(){
  $.ajax({
    method: 'get',
    url: '/postings',
    success: function(posts){
      renderPosts(posts)
    }
  })
}


function renderPosts(postings){
    var posts = postings.postings;
    var $container = $('ul#post-list');
    posts.forEach(function(post){
      console.log(post);
      var $el = $('<li>');
      $el.append( $('<h4>').text(post.game) );
      $el.append( $('<a href="#" class="get-info" data-name="'+post.game+'">').text("Get some info on this game"));
      if (post.user_id){
        $el.append( $('<h4>').text(post.user_id.username) );
        $el.append( $('<h5>').text(post.location) );
      }
      $el.append ( $('<a href="#" class="delete-posting" data-post-id="'+post._id+'">') );
      $container.append($el);
    })
}


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
        getPosts();
      }
    })
  });
}

function postInfoHandler(){
  $('.all-posts').on('click', '.get-info', function(e){
    e.preventDefault();
    var nameGame = $(this).data('name');
    $.ajax({
      method: 'get',
      url: '/users/taco',
      data: {name: nameGame},
      success: function(response){
        console.log(response);
        //Let's also create a link to BGG
      }
    })
  })
}



$(function(){

  logInHandler();
  logOutHandler();
  onloadGetter();
  newPostHandler();
  getPosts();
  postInfoHandler();
  deletePostsHandler();

});

//
