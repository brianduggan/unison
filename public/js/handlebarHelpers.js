Handlebars.registerHelper('deleteMe', function(element){
  var cookie = $.cookie('user_id');
  if (cookie === element.user_id._id){
    var el = new Handlebars.SafeString('<div class="go-right"><a href="#" class="update-posting"><span class="font-awesome-icon">&#xf062;</span>Update</a><a href="#" class="delete-posting" data-post-id="'+element._id+'"><span class="font-awesome-icon">&#xf056;</span>Delete</a></div>')
    return el
  }
})

Handlebars.registerHelper('updateMe', function(element){
  var cookie = $.cookie('user_id');
  if (cookie === element.user_id._id){
    var el = new Handlebars.SafeString('<form class="update-post-form" data-post-id="'+element._id+'"><input type="text" name="game" placeholder="Game" value="'+element.game+'" required><input type="text" name="locationName" placeholder="Place Name" value="'+element.locationName+'" required><input type="text" name="location" placeholder="Location" value="'+element.location+'" required><input type="text" name="players" placeholder="Players Needed" value="'+element.players+'" required><input type="submit" value="Update Post"></form>')
    return el
  }
})

Handlebars.registerHelper('capitalize', function(words){
  var wordArray = words.split("");
  var firstLetterCap = words.split(" ")[0].split("")[0].toUpperCase();
  wordArray[0] = firstLetterCap;
  return wordArray.join('');
})

Handlebars.registerHelper('emailme', function(post){
  var el;
  var cookie = $.cookie('user_id');
  if (cookie !== post.user_id._id){
    el = new Handlebars.SafeString('<a href="mailto:'+post.user_id.email+'?Subject=A%20Unison%20Gamer%20wants%20to%20play%20'+post.game+'"><span class="font-awesome-icon">&#xf0e0;</span></a>')
    return el
  }
  return el
})
