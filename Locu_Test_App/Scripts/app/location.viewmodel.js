function PlaceViewModel(app, dataModel) {
    var self = this,    startedLoad = false;

    
    self.loading = ko.observable(true);
    self.message = ko.observable();

    // Data
    self.addressLine1 = ko.observable("");
    self.city = ko.observable("").extend({ required: true });
    self.postal_code = ko.observable("").extend({ required: true });

    // Other UI state
    self.errors = ko.observableArray();
    self.validationErrors = ko.validation.group([self.addressLine1, self.city, self.postal_code]);
    self.saving = ko.observable(false);

     // Operations
    self.load = function () { 
        if (!startedLoad) {
            startedLoad = true;

            var data= dataModel.getLocation();
            if (typeof (data.city) !== "undefined" ) {
                self.city(data.city);
                self.addressLine1(data.addressLine1);
                self.postal_code(data.postal_code);
            } 

            self.loading(false);
        }
    }

    self.save = function () {
        // save
        self.saving(true);
        dataModel.saveLocation(self);
        self.saving(false);
    }

    self.home = function () {
        app.navigateToHome();
    };

}


app.addViewModel({
    name: "Place",
    bindingMemberName: "place",
    factory: PlaceViewModel,
    navigatorFactory: function (app) {
        return function (externalAccessToken, externalError) {
            app.errors.removeAll();
            app.view(app.Views.Place);
            app.place().load();
           
        }
    }
});
