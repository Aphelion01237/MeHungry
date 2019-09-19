// ON PAGE LOAD
//     request user location access NEED HTTPS FOR THIS
$(".ui.dropdown").dropdown();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
    console.log('position aquired');
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

var map;
var service;
var infowindow;
var walkPlaces;

function initMap(position) {
  var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map = new google.maps.Map({ center: userLocation });

  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  var foodType = document.getElementById("cuisine").value
  var request = {
      location: userLocation,
      radius: '1500',
      opennow: true,
      keyword: foodType,
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (response, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          response.sort(function(a, b){
            return b.rating - a.rating;
          })
          console.log(response)
          for(i = 0; i < 3; i++){
            // Creating a div to hold the resturant info
          var resturantDiv = $("<div class='resturant'>");
          // Storing the resturant info
          var resturantName = response[i].name;
          var resturantRating = response[i].rating;
          var resturantPrice = response[i].price_level;
          var resturantID = response[i].id;
          console.log(resturantName);
          console.log(resturantRating);
          console.log(resturantPrice);
          console.log(resturantID);
          console.log(i+1)
          $("#name-"+i).append().text(resturantName)
          $("#name-"+i).append().attr('resturantID',resturantID)
          $("#price-"+i).text(resturantPrice)
          $("#rating-"+i).text(resturantRating)
          }
      }
  });
}

$("#radiusButton").click(getLocation)


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

$("#test").click(function(){
  $(".test").modal('show');
});
$(".test").modal({
  closable: true
});