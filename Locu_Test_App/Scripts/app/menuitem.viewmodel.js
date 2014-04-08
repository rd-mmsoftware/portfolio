function MenuItemViewModel(app, dataModel) {
    var self = this,    startedLoad = false;
    var something;
    
    self.loading = ko.observable(true);
    self.message = ko.observable();

    // Data
  
    self.id = ko.observable("");
    self.cuisines = ko.observable("");
    self.name = ko.observable("");
    self.categories = ko.observable("");
    self.locality = ko.observable("");
    self.region = ko.observable("");
    self.phone = ko.observable("");
   
    
    // Other UI state
    self.errors = ko.observableArray();
   
    
    self.load = function (menuItemId) { // Load user management data
        // Operations
        if (!startedLoad) {
            startedLoad = true;

            dataModel.getMenuItem(menuItemId)
                .done(function (data) {
                    if (true) {
                        ko.mapping.fromJS(data.objects[0], {},self);
                    } else {
                        app.errors.push("Error retrieving user information.");
                    }
                    self.loading(false);
                }).failJSON(function (data) {
                    var errors;

                    self.loading(false);
                    errors = dataModel.toErrorsArray(data);

                    if (errors) {
                        app.errors(errors);
                    } else {
                        app.errors.push("Error retrieving user information.");
                    }
                });
        }
    };

  

    self.home = function () {
        app.navigateToHome();
    };

}

app.addViewModel({
    name: "MenuItem",
    bindingMemberName: "menuItem",
    factory: MenuItemViewModel,
    navigatorFactory: function (app) {
        return function (menuItemId) {
            app.errors.removeAll();
            app.view(app.Views.MenuItem);
            app.menuItem().load(menuItemId);
           
        }
    }
});
