app.controller("Routes", function ($scope, Routes)
{
    $scope.routes = [];

    Routes.loadFile(function (data) {
       
        for (var i = 0; i < data.length; i++)
        {
            if (data[i] != undefined)
            {
                if(data[i].name != undefined)
                {
                    $scope.routes.push(data[i].name);
                }
            }
            
        }


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