'use strict';

myApp.controller('mainCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    // MAP :
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // MARKERS :
    $http.get('json/cords.json').success(function(data) {

        // JSON ('title', 'snippet')
        var locas = data;
        angular.forEach(data, function(value, key) { console.log(value.latitude + ' | ' + value.longitude); });


        // INIT
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();


        // MARKERS
        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map:        $scope.map,
                icon:       'images/icon.png',
                animation:  google.maps.Animation.DROP,
                position:   new google.maps.LatLng(info.latitude, info.longitude),
                title:      '<h2>' + info.title + '</h2>',
                title_raw:   info.title,
                content:     info.snippet
            });

            // ANIMATION
            function stopAnimAll() {
                $scope.markers.forEach(function (a, b) {
                    a.setAnimation(null);
                });
            }

            function toggleBounce() {
                stopAnimAll();
                if (marker.getAnimation() == null) {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }

            marker.addListener('click', toggleBounce);
            google.maps.event.addListener($scope.map, 'click', stopAnimAll);


            // CONTENTS + TITLES
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent(marker.title + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);
        };

        for (var i = 0; i < locas.length; i++) {
            createMarker(locas[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

    });


}]);
