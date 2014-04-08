function SearchMenuViewModel(app, dataModel) {
    var self = this,    startedLoad = false;

    
    self.loading = ko.observable(true);
    self.message = ko.observable();
    self.haveResults = ko.observable(false);

    // Data
    self.name = ko.observable("");
    self.price__lte = ko.observable("");
    self.description = ko.observable("");
    self.postal_code = ko.observable("");
    self.distance = ko.observable("");
    self.radius = ko.computed(function () {
        return self.distance() * 1610;  // Radius is in meters
    });
    // Other UI state
    self.errors = ko.observableArray();
    self.validationErrors = ko.validation.group([self.addressLine1, self.city, self.postal_code]);
    self.searching = ko.observable(false);

    self.results = ko.observableArray([   ]);

     // Operations
    self.load = function () { // Load user management data
        var loc = dataModel.getLocation();
        self.postal_code(loc.postal_code);
        self.locality(loc.city);
        self.loading(false);
    }

    self.search = function () {
        // save
        self.searching(true);
        dataModel.menuSearch(this)
            .done(function (data) {
            if (true) {
                ko.mapping.fromJS(data.objects,{},self.results);
                self.haveResults(true);
            } else {
                app.errors.push("Error retrieving user information.");
            }
            self.searching(false);
        }).failJSON(function (data) {
            var errors;
            self.searching(false);
            errors = dataModel.toErrorsArray(data);

            if (errors) {
                app.errors(errors);
            } else {
                app.errors.push("Error retrieving user information.");
            }
        });
    }

    self.details = function(data) {
        
        app.navigateToMenuItem(data.id());
    };

    self.home = function () {
        app.navigateToHome();
    };

}


app.addViewModel({
    name: "SearchMenu",
    bindingMemberName: "searchMenu",
    factory: SearchMenuViewModel,
    navigatorFactory: function (app) {
        return function (externalAccessToken, externalError) {
            app.errors.removeAll();
            app.view(app.Views.SearchMenu);
            app.searchMenu().load();
           
        }
    }
});
