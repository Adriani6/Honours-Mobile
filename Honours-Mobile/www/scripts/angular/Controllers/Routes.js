app.controller("Routes", function ($scope, Routes)
{
    Routes.loadFile(function (data) {
        $scope.routes = data;
    });

    $scope.retrievedRoute = [];
    //$scope.routes = Routes.getSavedRoutes();

    $scope.retrieveUID = function(uid)
    {
        $scope.retrievedRoute = [];
        //Random Route UID = ca2vn9
        Routes.retrieveRoute(uid, function(data)
        {
            console.log(data)
            $scope.retrievedRoute.push(data);
        })
    }

    $scope.saveRoute = function()
    {
        Routes.saveRoute($scope.retrievedRoute[0]);
    }
})