function slabTextHeadlines() {
  $('#slabtext1').fitText(.81);
  $('#slabtext2').fitText(.35);
  $('#slabtext3').fitText(1.33);
};

$(document).ready(function() {
  slabTextHeadlines();
  prettyPrint();

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

