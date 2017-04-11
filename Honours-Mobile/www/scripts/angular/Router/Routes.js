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
    .when("/savedRoutes", {
        templateUrl: "views/savedRoutes.html",
        controller: "Routes"
    })
})