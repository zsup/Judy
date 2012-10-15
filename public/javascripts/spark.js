function slabTextHeadlines() {
$("h1").slabText({
// Don't slabtext the headers if the viewport is under 380px
"viewportBreakpoint":380
});
};

$(document).ready(function() {
  slabTextHeadlines();
});