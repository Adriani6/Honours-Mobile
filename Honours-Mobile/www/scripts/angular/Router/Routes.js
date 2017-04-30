app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/index.html"
    })
    .when("/atLocation", {
        templateUrl: "views/atLocation.html"
    })
    .when("/addRoute", {
        templateUrl: "views/addRoute.html",
        controller: "Routes"
    })
    .when("/aroundMe", {
        templateUrl: "views/aroundMe.html",
        controller: "Around"
    })
    .when("/savedRoutes", {
        templateUrl: "views/savedRoutes.html",
        controller: "Routes"
    })
    .when("/view_route_details/:id", {
        templateUrl: "views/view_saved_route_places.html",
        controller: "RoutesPreview"
    })
})