function getLocation(location){
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +location+ '&key=AIzaSyAtQeWl-x_C9eL4oyWNKiiuCyOrtG2E-6I';
  console.log(location);
  var coordinates = {};
  $.ajax({
    method: 'get',
    url: url,
    success: function(response){
      var resultGeo = response.results[0].geometry;
      lat = resultGeo.location.lat;
      lng = resultGeo.location.lng;
      coordinates = {latitude: lat, longitude: lng};
      return coordinates;
      makeMap(coordinates);
    }
  });
}

var myMap = {};

function masterMap(locations){

  myMap.init = function(){
    this.map;
    this.currentLatLng;
    this.zoom;
    this.mapEl;

    this.zoom = 15;
    this.mapEl = document.querySelector('#map');

    this.currentLatLng = new google.maps.LatLng(40.6784471, -73.9653714);

    this.map = new google.maps.Map( this.mapEl, {
      center: this.currentLatLng,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  locations.postings.forEach(function(loc){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +loc.location+ '&key=AIzaSyAtQeWl-x_C9eL4oyWNKiiuCyOrtG2E-6I';
    var coordinates = {};
    $.ajax({
      method: 'get',
      url: url,
      success: function(response){
        if (response.results[0]){
          var resultGeo = response.results[0].geometry;
          lat = resultGeo.location.lat;
          lng = resultGeo.location.lng;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: this.map,
          });
          marker.info = new google.maps.InfoWindow({
            content: '<h2>'+loc.game+'</h2><h4>'+loc.user_id.username+'</h4>'
          });
          google.maps.event.addListener(marker, 'mouseover', function(){
            marker.info.open(myMap.map, marker);
          })
          google.maps.event.addListener(marker, 'mouseout', function(){
            marker.info.close(myMap.map, marker);
          })
          marker.setMap(myMap.map);
        }
      }
    });
  })

};
  myMap.init();
  console.log(myMap);


}


function centerMap(location){
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +location+ '&key=AIzaSyAtQeWl-x_C9eL4oyWNKiiuCyOrtG2E-6I';
  $.ajax({
    method: 'get',
    url: url,
    success: function(response){
      if (response.results[0]){
        var data = response.results[0].geometry.location;
        var lat = data.lat;
        var lng = data.lng;
        var coords = new google.maps.LatLng(lat, lng);
        myMap.map.setCenter( coords );
      }
    }
  });
}
