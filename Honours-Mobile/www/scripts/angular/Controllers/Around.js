app.controller("Around", function ($scope, $cordovaGeolocation, $http, $location, Routes) {

    $scope.routes = [];

    cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
        if (enabled) {
            $cordovaGeolocation
            .getCurrentPosition({ timeout: 10000, enableHighAccuracy: false })
            .then(function (position) {
                console.log("position found");

                long = position.coords.longitude
                lat = position.coords.latitude
                $scope.position = long;
                console.log(position.coords)
                $http.get("http://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1").then(function (city) {
                    $scope.position = city.data.address.city + ", " + city.data.address.country;
                    $http.get("http://193.70.114.144/api/search/" + city.data.address.city).then(function (data) {
                        $scope.routes = data.data;

                        for (var i = 0; i < data.data.length; i++)
                        {
                            $scope.routes[i].distanceToClient = Routes.getDistance(lat, long, $scope.routes[i].geo.location.lat, $scope.routes[i].geo.location.lng).toFixed(2);
                            //$scope.routes[i]
                        }
                        
                        $scope.routes.sort(compareByDistance)
                        //sortByDistance();
                    })
                })

            }, function (err) {
                console.log("unable to find location");
                alert("Not Found")
                $scope.errorMsg = "Error : " + err.message;
            });
        }
        else {
            alert("Please enable Location/GPS functionality.");
        }
    }, function (error) {
        console.error("The following error occurred: " + error);
    });

    function compareByDistance(a, b) {
        return a.distanceToClient - b.distanceToClient
    }
})