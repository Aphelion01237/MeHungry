// ON PAGE LOAD
//     request user location access NEED HTTPS FOR THIS
$(".ui.dropdown").dropdown();

$(document).ready(getLocation())


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
var radi = "1500"

$("#radiusButton1").click(function () {
  radi = "3750"
  console.log(radi)
})
$("#radiusButton2").click(function () {
  radi = "1500"
  console.log(radi)
})

function initMap() {
  map = new google.maps.Map({ center: { lat: userlat, lng: userlong } });
  var foodType = document.getElementById("cuisine").value
  var request = {
    location: { lat: userlat, lng: userlong },
    radius: radi,
    opennow: true,
    keyword: foodType,
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function (response, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      response.sort(function (a, b) {
        return b.rating - a.rating;
      })
      console.log(response)
      for (i = 0; i < 3; i++) {
        // Creating a div to hold the resturant info
        var resturantDiv = $("<div class='resturant'>");
        // Storing the resturant info
        var resturantName = response[i].name;
        var resturantRating = response[i].rating;
        var resturantPrice = response[i].price_level;
        var resturantID = response[i].place_id;
        console.log(resturantName);
        console.log(resturantRating);
        console.log(resturantPrice);
        console.log(resturantID);
        console.log(i + 1)
        $("#name-" + i).append().text(resturantName)

        $(".attr-" + i).append().attr('resturantID', resturantID)

        $("#rating-" + i).text(resturantRating)
        $("#price-" + i).text("Price: ")
        for (j = 0; j < resturantPrice; j++) { $("#price-" + i).append("$") }
        if (!resturantPrice) {
          $("#price-" + i).append("No Info")
        }
      }
    }
  });
}


//     check local storage for unique id key on
//         if no key is present, continue as normal
//         if key is present, proceed to navigation page


function showMap() {
  $(".modal").modal('hide')
  $('.placeInfo').html("")
  $('.placeWeather').html("")
  $('#map').html("")
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: userlat, lng: userlong },
    zoom: 15
  });

  var request = {
    placeId: "",
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'url']
  };
  request.placeId = $PlaceIdHolder
  console.log($PlaceIdHolder);
  console.log(request)

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
      map.setCenter(marker.getPosition())
      $('.placeInfo').append('<b>Launch navigation to: ' + place.name + '</b><br><b>' +
        place.formatted_address + '</b>');

      $('.googleDirections').attr('href', place.url)
      var APIKey = "99ed7b329de61df5c65808f174a3f190";
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
        "lat=" + userlat + "&lon=" + userlong + "&units=imperial&APPID=" + APIKey;
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          console.log(queryURL);
          console.log(response);
          $('.placeWeather').append("In 3 hours it'll be about " + response.list[0].main.temp + 
          "°F and "+ response.list[0].weather[0].main.toLowerCase() + ' at '+ place.name);
        });
    } else {
      console.log(status)
    }
  });
}

function getPlaceID() {
  $PlaceIdHolder = $(this).attr("resturantid")
}

$('.resturantBtn').click(getPlaceID)
$('.resturantBtn').click(showMap)

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


$(function () {
  $("#test").click(initMap)

  $("#test").click(function () {
    var search = $("#cuisine").val()
    console.log(search)

    if (search !== "Pick Your Flavor") {
      $(".test").modal('show');
    }
    // var $("#radiusButton")
  });
  $(".test").modal({
    closable: true
  })
});

