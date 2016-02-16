var geocoder;
var myMap = {};

function masterMap(locations){
  myMap.init = function(){
    this.zoom = 15;
    geocoder = new google.maps.Geocoder()
    this.currentLatLng = new google.maps.LatLng(40.6784471, -73.9653714);

    this.mapEl = document.querySelector('#map');
    this.map = new google.maps.Map( this.mapEl, {
      center: this.currentLatLng,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  locations.postings.forEach(function(loc){
    geocoder.geocode({'address': loc.location}, function(response, status){
      if (response){
        var marker = new google.maps.Marker({
          position: response[0].geometry.location,
          map: this.map
        });
        marker.info = new google.maps.InfoWindow({
          content: '<h2>'+loc.game+'</h2><h4>Host: '+loc.user_id.username+'</h4><p>Players Needed: '+loc.players+'</p>'
        });
        google.maps.event.addListener(marker, 'click', function(){
          marker.info.open(myMap.map, marker);
        });
        marker.setMap(myMap.map);
      } else {
        console.log(status);
      }
    });
  });

};
  myMap.init();
  console.log(myMap);
}


function centerMap(location){
  geocoder = new google.maps.Geocoder()
  geocoder.geocode({'address': location}, function(response, status){
    if (response){
      myMap.map.setCenter( response[0].geometry.location );
    } else {
      console.log(status);
    }
  })
}
