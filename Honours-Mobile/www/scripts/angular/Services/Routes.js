app.service("Routes", function ($http, $cordovaFile)
{
    var file = [];

    this.loadFile = function(callback)
    {
        var self = this;

        $cordovaFile.readAsText(cordova.file.dataDirectory, "routes.json").then(function(success)
        {
            file = JSON.parse(success);
            callback(file)
            alert("Loaded Data")
        }, function (error) {
            alert("Error Ran")
            if (error)
            {
                self.saveFile();
                self.loadFile();
            }
        })
    }

    this.retrieveRoute = function(uid, callback)
    {
        $http.get("http://193.70.114.144/api/route/retrieve?uid="+uid).then(function(data)
        {
            callback(data.data);
        })
    }

    this.saveRoute = function(route)
    {
        file.push(route);
        this.saveFile();
        
    }

    this.saveFile = function()
    {
        $cordovaFile.writeFile(cordova.file.dataDirectory, "routes.json", JSON.stringify(file), true);
    }

    this.getSavedRoutes = function()
    {
        return file;
    }
})