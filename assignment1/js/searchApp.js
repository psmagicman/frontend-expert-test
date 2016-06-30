var searchApp = angular.module('searchApp', []);

searchApp.controller('PlaceListController', 
    function PlaceListController ($scope, $http) {

    // Get the data and load into scope variables
    $http.get('res/amsterdam.json').then(function success(response) {
        console.log(response.data); 
        $scope.bounds = response.data.bounds;
        $scope.initMap($scope.bounds);
        $scope.rows = response.data.rows;
        $scope.drawMarkers($scope.rows);
    }, function error(response) {
        console.log("ERROR in retrieving data");
        // error will only result in just showing the map
        $scope.initMap({n: 52.43095, s: 52.318274, e: 5.068373, w: 4.728856})
    });

    /*
    * This method takes an input object "bounds" containing 
    * north, south, east, and west coordinates then calculates
    * the map center used for rendering
    */
    $scope.initMap = function (bounds) {
        // console.log(bounds);
        var longitude = (bounds.n + bounds.s) / 2;
        var latitude = (bounds.e + bounds.w) / 2;
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: longitude, lng: latitude},
            zoom: 12
        });
    };

    /*
    * This method takes an input array "rows" that contain
    * data for each listing in the region and draws markers
    * on the map
    */
    $scope.drawMarkers = function (rows) {
        rows.forEach(function (value, key) {
            // console.log(value.coordinate);
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: {lat: value.coordinate[0], lng: value.coordinate[1]}
            })
        });
    }

});