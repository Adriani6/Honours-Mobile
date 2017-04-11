app.controller("App", function ($scope, $cordovaGeolocation, $http, $location)
{
    $scope.getLocation = function()
    {
        $cordovaGeolocation
        .getCurrentPosition({ timeout: 10000, enableHighAccuracy: false })
        .then(function (position) {
            console.log("position found");
            
            long = position.coords.longitude
            lat = position.coords.latitude
            $scope.position = long;
            console.log(position.coords)
            $http.get("http://nominatim.openstreetmap.org/reverse?format=json&lat="+lat+"&lon="+long+"&zoom=18&addressdetails=1").then(function (city)
            {
                $scope.position = city.data.address.city + ", " + city.data.address.country;
                $http.get("http://193.70.114.144/api/search/"+city.data.address.city).then(function(data)
                {
                    $scope.data = data.data;
                })
            })

        }, function (err) {
            console.log("unable to find location");
            alert("Not Found")
            $scope.errorMsg = "Error : " + err.message;
        });
    }
})