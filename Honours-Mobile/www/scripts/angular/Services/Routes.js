app.service("Routes", function ($http, $cordovaFile)
{
    var file = [];

    this.loadFile = function(callback)
    {
        var self = this;

        alert("Loading File")

        $cordovaFile.readAsText(cordova.file.dataDirectory, "routes.json").then(function(success)
        {
            try
            {
                file = JSON.parse(success);
                alert("Loaded Data")
                callback(file)
                
            }
            catch(err)
            {
                alert(err)
            }
            
            
            
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

    this.toRad = function(Value) {
        return Value * Math.PI / 180;
    }

    this.getDistance = function(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
})