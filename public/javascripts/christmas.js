function spark_fb_login(response) {
  if (response.status === 'connected') {
    var data = {
      userID      : response.authResponse.userID,
      accessToken : response.authResponse.accessToken
    }
    $.post('/christmas/login', data, function() {
      $('#xmas-buttons').show();
      $('#facebook-login').hide();
      var fb_post_obj = {
        link: 'http://www.sparkdevices.com/christmas',
        name: 'Spark Christmas House',
        description: "I'm controlling someone's Christmas lights over the internet using Spark! Check out the webcam, and take control yourself!"
      };
      FB.api('/me/feed', 'post', fb_post_obj, function(post_response){
        if (post_response['error']) {
          fb_post_obj['method'] = 'feed';
          FB.ui(fb_post_obj, function(dialog_response){
            console.log(dialog_response);
          });
        }
      });
    });
  } else if (response.status === 'not_authorized') {
    $('#facebook-login').show();
  } else {
    $('#facebook-login').show();
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '208678505934382', // App ID
    channelUrl : 'http://www.sparkdevices.com/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
  FB.Event.subscribe('auth.login', spark_fb_login);
  FB.getLoginStatus(spark_fb_login);
};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

$(document).ready(function(){
  $('#xmas-buttons').children().each(function(index){
    $(this).click(function(){
      $.post('/christmas/' + index);
    });
  });
  $('#fb-login-button').click(function(){
    FB.login(function(response) {
      if (response.authResponse) {
        console.log("You did it!");
      } else {
        console.log("Login cancelled/failed");
      }
    });
  });
});
