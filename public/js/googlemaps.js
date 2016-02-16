function getLocation(location){
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +location+ '&key=AIzaSyBpMcVJo8Lcg2KEHsKYRp6hGtyJBxBoVVs';
  console.log(location);
  var coordinates = {};
  $.ajax({
    method: 'get',
    url: url,
    success: function(response){
      var resultGeo = response.results[0].geometry;
      var lat = resultGeo.location.lat;
      var lng = resultGeo.location.lng;
      coordinates = {latitude: lat, longitude: lng};
      return coordinates;
    }
  });
}

var myMap = {};

function masterMap(locations){
  myMap.init = function(){
    this.zoom = 15;

    // if (navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(function(pos){
    //     var currentLat = pos.coords.latitude;
    //     var currentLng = pos.coords.longitude;
    //     console.log(currentLat, currentLng)
    //     this.currentLatLng = new google.maps.LatLng(currentLat, currentLng);
    //     console.log(this.currentLatLng)
    //   })
    // } else {
      this.currentLatLng = new google.maps.LatLng(40.6784471, -73.9653714);
    // }

    this.mapEl = document.querySelector('#map');
    this.map = new google.maps.Map( this.mapEl, {
      center: this.currentLatLng,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  locations.postings.forEach(function(loc){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +loc.location+ '&key=AIzaSyBpMcVJo8Lcg2KEHsKYRp6hGtyJBxBoVVs';
    var coordinates = {};
    $.ajax({
      method: 'get',
      url: url,
      success: function(response){
        if (response.results[0]){
          var resultGeo = response.results[0].geometry;
          var lat = resultGeo.location.lat;
          var lng = resultGeo.location.lng;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: this.map,
          });
          marker.info = new google.maps.InfoWindow({
            content: '<h2>'+loc.game+'</h2><h4>Host: '+loc.user_id.username+'</h4><p>Players Needed: '+loc.players+'</p>'
          });
          google.maps.event.addListener(marker, 'click', function(){
            marker.info.open(myMap.map, marker);
          });
          marker.setMap(myMap.map);
        }
      }
    });
  });

};
  myMap.init();
  console.log(myMap);


}


function centerMap(location){
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +location+ '&key=AIzaSyBpMcVJo8Lcg2KEHsKYRp6hGtyJBxBoVVs';
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
