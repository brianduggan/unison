function newPostHandler(){
  $('form#new-post').on('submit', function(e){
    e.preventDefault();
    var userId = $.cookie('user_id');
    var $gameField = $(this).find('input[name="game"]');
    var gameValue = $gameField.val();
    var $locationNameField = $(this).find('input[name="locationName"]');
    var locationNameValue = $locationNameField.val();
    var $locationField = $(this).find('input[name="location"]');
    var locationValue = $locationField.val();
    var $playersField = $(this).find('input[name="players"]');
    var playersValue = $playersField.val();
    var postingData = {game: gameValue, locationName: locationNameValue, location: locationValue, players: playersValue , user_id: userId};
    console.log(postingData);
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


function updateButton(){
  $('.post-games').on('click', '.update-posting', function(e){
    e.preventDefault();
    console.log("Hello");
    $('.update-post').slideToggle();
  })
}

function updatePostsHandler(){
  $('.post-games').on('submit', 'form.update-post-form' , function(e){
    e.preventDefault();
    var userId = $.cookie('user_id');
    var $gameField = $(this).find('input[name="game"]');
    var gameValue = $gameField.val();
    var $locationNameField = $(this).find('input[name="locationName"]');
    var locationNameValue = $locationNameField.val();
    var $locationField = $(this).find('input[name="location"]');
    var locationValue = $locationField.val();
    var $playersField = $(this).find('input[name="players"]');
    var playersValue = $playersField.val();
    var postingData = {game: gameValue, locationName: locationNameValue, location: locationValue, players: playersValue , user_id: userId};
    var postId = $(this).data('post-id');
    $.ajax({
      method: 'patch',
      url: '/postings/' + postId,
      data: postingData,
      success: function(response){
        handlebarsPost();
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

$(function(){
  newPostHandler();
  updatePostsHandler();
  updateButton();
  deletePostsHandler();
})
