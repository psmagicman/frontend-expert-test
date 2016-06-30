var searchApp = angular.module('searchApp', []);

searchApp.controller('PlaceListController', 
    function PlaceListController($scope, $http) {

    // Get the data and load into scope variables
    $http.get('res/amsterdam.json').then(function success(response) {
        console.log(response.data); 
        $scope.bounds = response.data.bounds;
        $scope.initMap($scope.bounds);
        $scope.extraCoordinates = response.data.extraCoordinates;
        $scope.filters = response.data.filters;
        $scope.pagination = response.data.pagination;
        $scope.rows = response.data.rows;
    }, function error(response) {
        console.log("ERROR in retrieving data");
        $scope.initMap({n: 52.43095, w: 4.728856})
    });

    $scope.initMap = function (bounds) {
        console.log(bounds);
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: bounds.n, lng: bounds.w},
            zoom: 12
        });
    }


});