app.controller("RoutesPreview", function ($scope, Routes, $routeParams)
{
    $scope.routes = [];

    Routes.loadFile(function (data) {
        $scope.routes = data[$routeParams.id];
        
    });
})