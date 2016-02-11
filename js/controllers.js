'use strict';

myApp.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

    // MAP :
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // MARKERS :
    $http.get('json/cords.json').success(function(data) {
        $scope.datas  = data;

        $scope.markers = [];

        /*angular.forEach(data, function(value, key) {
            console.log(value.latitude + ' | ' + value.longitude);
        });*/

        var infoWindow = new google.maps.InfoWindow();


        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.latitude, info.longitude),
                title: info.id
            });

            marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

            //console.log('titles   : ' + marker.title);
            //console.log('contents : ' + marker.content);
        };


        for (var i = 0; i < data.length; i++){
            createMarker(data[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    });


}]);
