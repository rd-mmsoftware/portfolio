function AppDataModel() {
    var self = this,
        // Routes
        siteUrl = "/",
        searchLocuUrl = "https://api.locu.com/v1_0/venue/search/",
        venueLocuUrl = "https://api.locu.com/v1_0/venue/",
        menusearchLocuUrl = "https://api.locu.com/v1_0/menu_item/search/",
        menuitemLocuUrl = "https://api.locu.com/v1_0/menu_item/",
        locuapikey = 'api_key=d60897491024530f145851db6a3c16f836900369'
    // Route operations


    // Operations

    self.toErrorsArray = function (data) {
        var errors = new Array(),
            items;

        if (!data || !data.message) {
            return null;
        }

        if (data.modelState) {
            for (var key in data.modelState) {
                items = data.modelState[key];

                if (items.length) {
                    for (var i = 0; i < items.length; i++) {
                        errors.push(items[i]);
                    }
                }
            }
        }

        if (errors.length === 0) {
            errors.push(data.message);
        }

        return errors;
    };

    // Data
    self.returnUrl = siteUrl;


    self.saveLocation = function (data) {
        var locationobj = ko.mapping.toJS(data);
        localStorage.setItem('location', JSON.stringify(locationobj));
    }

    self.getLocation = function () {
        var locationobj = localStorage.getItem('location');
        if (locationobj !== "undefined" && locationobj !== null) {
           return JSON.parse(locationobj);
        } else {
            return null;
        }
    };

    self.addParms = function (dataObj, properties) {
        var queryString = "?";
        for (var prop in properties) {
            if (dataObj[properties[prop]]() !== "") {
                queryString += properties[prop] + "=" + dataObj[properties[prop]]() + "&";
            }
        }
        return queryString;
    };

    // LOCU Section
    self.venueSearch = function (query) {
        //var p1 = $.parms(ko.toJS(query));
        var url = searchLocuUrl + this.addParms(query, ["name", "cuisine", "locality", "region","postal_code"]);
        url += locuapikey;
        return $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
            cache: false
        });
    };
    // LOCU Section
    self.menuSearch = function (query) {
        //var p1 = $.parms(ko.toJS(query));
        var url = menusearchLocuUrl + this.addParms(query, ["name", "description", "price__lte", "radius", "postal_code"]);
        url += locuapikey;
        return $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
            cache: false
        });
    };
    self.getVenue = function (venueId) {
        var url = venueLocuUrl + venueId + '/?';
        url += locuapikey;
        return $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
            cache: false
        });
    };
  
    self.getMenuItem = function (menuItemId) {
        var url = menuitemLocuUrl + menuItemId + '/?';
        url += locuapikey;
        return $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
            cache: false
        });
    };
}
