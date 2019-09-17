// ON PAGE LOAD
//     request user location access
//     check local storage for unique id key on
//         if no key is present, continue as normal
//         if key is present, proceed to navigation page

// query google maps api
//     get all resturant establishments in both radii
//     do this sequentially, walking first

// make array of unique keywords for resturants from response
//     do this FOR EACH RADIUS

// populate dropdown menu with strings from the array
//     depending on which radius is selected (walking or driving)
//     of no results, generate modal with sadface and "guess you're gonna starve"

// when input is selected in dropdown menu
//     query google maps for the specific keyword, within resturant establishments
//     turn result into an array
//     sort array based on rating (highest first)

// when GO button is pressed
//     generate modal with top three [0, 1, 2] from rating sorted array
//     each result in modal should be a button

// when button in modal is pressed
//     save place selection information to unique id key in local storage
//     send user to navigation page

// ON NAVIGATION PAGE LOAD
//     query google maps api for selected location and generate map
//         display address and description at top section of page
// 
//     query openweather api with lat/long for selected location
//          do this for the location forecast
//          pull expected temperature for next 4 hours
//          display expected temperature and conditions under address and description
// 
//     dislay map from query under address/description/forecast
// 
//     generate 3 buttons, display under map
//         one button opens location in google maps
//         one button copies address to clipboard
//         one button resets app, deleting local storage and loading main page






$("#button").on("click", function() {

$('.large.modal').modal('show');

})
$(function(){
	$("#test").click(function(){
		$(".test").modal('show');
	});
	$(".test").modal({
		closable: true
	});
});