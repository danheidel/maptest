
      var directionsDisplay, map, infoWindow;
      var directionsService = new google.maps.DirectionsService();
      var markerSet = [];
      var pathPoints = [];

      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(47.624, 237.664),
          zoom: 16
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        infoWindow = new google.maps.InfoWindow();
      }

      function calcRoute() {
        var start = document.getElementById('routeStart').value;
        var end = document.getElementById('routeEnd').value;
        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(result);
            var routeInfo = result.routes[0].legs[0];
            showSteps(routeInfo);
            console.log(result);
          }
        });
      }

      function showSteps(routeInfo){
        for(var rep=0;rep<routeInfo.steps.length;rep++){
          var marker = new google.maps.Marker({
            position: routeInfo.steps[rep].start_point,
            map: map
          });
          var stepPath = google.maps.geometry.encoding.decodePath(step[rep].encoded_lat_lngs);
          if(rep===0) console.log(stepPath);
          attachMarkerData(marker, routeInfo.steps[rep]);
          markerSet[rep] = marker;
        }
      }

      function attachMarkerData(marker, step){
        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent(step.instructions + '\n    distance: ' + step.distance.text + '\n    start lat: ' + step.start_point.e + '\n long: ' + step.start_point.d + '\n encoded data: ' + google.maps.geometry.encoding.decodePath(step.encoded_lat_lngs));
          infoWindow.open(map, marker);
        });
      }

      google.maps.event.addDomListener(window, 'load', initialize);