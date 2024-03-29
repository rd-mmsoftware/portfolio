﻿function UserInfoViewModel(app, name, dataModel) {
    var self = this;

    // Data
    self.name = ko.observable(name);

    // Operations
    self.logOff = function () {
        dataModel.logout().done(function () {
            app.navigateToLoggedOff();
        }).fail(function () {
            app.errors.push("Log off failed.");
        });
    };

    self.place = function () {
        app.navigateToPlace();
    };

    self.search = function () {
        app.navigateToSearch();
    };

    self.manage = function () {
        app.navigateToManage();
    };
}
