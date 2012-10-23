function slabTextHeadlines() {
  $('#slabtext1').fitText(.81);
  $('#slabtext2').fitText(.35);
  $('#slabtext3').fitText(1.33);
  $('#slabtext4').fitText(1);
  $('#slabtext5').fitText(.35);
};

$(document).ready(function() {
  slabTextHeadlines();
  prettyPrint();
  try {
    Typekit.load();
  }
  catch(e){}

  $('body').waypoint(function(e, d) {
  	if (d === 'down') {
  		$('.inner').addClass("navbar-inner");
  	}
  	else {
  		$('.inner').removeClass("navbar-inner");
  	}
  }, {
  	offset: -20
  });
});

