// ON PAGE LOAD
//     request user location access NEED HTTPS FOR THIS
$(".ui.dropdown").dropdown();

$(document).ready( getLocation() )


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  console.log('position aquired');
  userlat = position.coords.latitude;
  userlong = position.coords.longitude;
}

var map;
var service;
var infowindow;
var radi ="1500"

$("#radiusButton1").click(function(){
  radi = "3750"
  console.log(radi)
})
$("#radiusButton2").click(function(){
  radi = "1500"
  console.log(radi)
})

function initMap() {
  map = new google.maps.Map({ center: {lat: userlat, lng: userlong} });
  var foodType = document.getElementById("cuisine").value
  var request = {
      location: {lat: userlat, lng: userlong},
      radius: radi,
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

          $("#rating-"+i).text(resturantRating)
          $("#price-"+i).text("Price: ")
          for (j=0; j<resturantPrice; j++)
            {$("#price-"+i).append("$")}
            if(!resturantPrice){
              $("#price-"+i).append("No Info")
            }
          }
      }
  });
}


//     check local storage for unique id key on
//         if no key is present, continue as normal
//         if key is present, proceed to navigation page


function showMap() {
  var map1 = new google.maps.Map(document.getElementById('map'), {
    center: {lat: userlat, lng: userlong},
    zoom: 15
  });
  
  var request1 = {
    // placeId: placeID,
    placeId: '5d7feac3f75ec6ec9b6a5c7cc19df89327f37f89',
    fields: ['name', 'formatted_address', 'place_id', 'geometry']
  };

  var infowindow = new google.maps.InfoWindow();
  var serviceMap = new google.maps.places.PlacesService(map1);

  serviceMap.getDetails(request1, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map1,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map1, this);
      });
    }
  });
}

function getPlaceID(){
  PlaceID = $(this).attr("resturantid")
  console.log(PlaceID);
  
}

$('#resturantBtn').click(getPlaceID)
$('#resturantBtn').click(showMap)

// when button in modal is pressed
//     open map
// 
//     query openweather api with lat/long for selected location
//          do this for the location forecast
//          pull expected temperature for next 4 hours
//          display expected temperature and conditions under address and description
// 
//     dislay map from query under address/description/forecast
// 
//     generate 2 buttons, display under map
//         one button opens location in google maps
//         one button copies address to clipboard


$(function(){
  $("#test").click(initMap)

	$("#test").click(function(){
    var search = $("#cuisine").val()
    console.log(search)

    if (search !=="Pick Your Flavor") {
      $(".test").modal('show');
    }
    // var $("#radiusButton")
	});
	$(".test").modal({
		closable: true
	})
});

