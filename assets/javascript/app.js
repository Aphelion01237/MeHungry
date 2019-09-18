// ON PAGE LOAD
//     request user location access NEED HTTPS FOR THIS
$(".ui.dropdown").dropdown();

// test lat/long variables


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(userPosition);
      console.log('position aquired');
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
function userPosition(position) {
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;
    // var userLat = 37.703171
    // var userLong = -122.130275
    initMap()
}

var map;
var service;
var infowindow;
var walkPlaces;
// var userLat = 37.703171
// var userLong = -122.130275

// NEED TO CHANGE SELECT CLASS TO PULL FROM OUT DROPDOWN
$("select.country").change(function(){
  var $foodType = $(this).children("option:selected").val();
});

function initMap() {
    var userLocation = new google.maps.LatLng(userLat, userLong);
    map = new google.maps.Map({ center: userLocation });

    var request = {
        location: userLocation,
        radius: '500',
        type: ['restaurant'],
        opennow: true,
        // keyword: $foodType,
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (response, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            response.sort(function(a, b){
              return b.rating - a.rating;
            })
            console.log(response)
        }
    });
}
getLocation()


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
})