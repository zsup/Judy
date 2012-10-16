function slabTextHeadlines() {
$("h1").slabText({
// Don't slabtext the headers if the viewport is under 380px
"viewportBreakpoint":380
});
};

$(document).ready(function() {
  slabTextHeadlines();

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

