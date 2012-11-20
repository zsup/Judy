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

  window.setTimeout(function() {
    $('.bounce').effect("bounce", {"distance": 30}, 800);
  }, 5000);

  $('#pressnav').affix({
    offset: {
      top: 300
    }
  });

  // $('#pressnavbar').scrollspy();

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

