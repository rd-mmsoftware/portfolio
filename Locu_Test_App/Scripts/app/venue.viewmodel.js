function VenueViewModel(app, dataModel) {
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
    self.postal_code = ko.observable("");
    self.open_hours = { Monday: ko.observable("?"), Tuesday: ko.observable("?"), Wednesday: ko.observable("?"), Thursday: ko.observable("?"), Friday: ko.observable("?"), Saturday: ko.observable("?"), Sunday: ko.observable("?") };
    
    
    // Other UI state
    self.errors = ko.observableArray();
   
    
    self.load = function (venueId) { // Load user management data
        // Operations
        if (!startedLoad) {
            startedLoad = true;

            dataModel.getVenue(venueId)
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
    name: "Venue",
    bindingMemberName: "venue",
    factory: VenueViewModel,
    navigatorFactory: function (app) {
        return function (venueId) {
            app.errors.removeAll();
            app.view(app.Views.Venue);
            app.venue().load(venueId);
           
        }
    }
});
