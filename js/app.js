'use strict';

var myApp = angular.module('myApp', ['uiGmapgoogle-maps']);

/*
myApp.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
    GoogleMapApiProviders.configure({
        china: true
    });
}]);
*/

myApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: '',
        v: '3',
        libraries: 'weather,geometry,visualization'
    });
});



