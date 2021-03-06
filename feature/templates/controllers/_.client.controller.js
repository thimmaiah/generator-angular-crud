(function () {
    'use strict';

    angular
        .module('app.<%= camelizedSingularName %>')
        .controller('<%= featureSingularName %>Controller', <%= featureSingularName %>Controller);

    <%= featureSingularName %>Controller.$inject = ['logger',
        '$stateParams',
        '$state',
        '<%= featureSingularName %>',
        'TableSettings',
        '<%= featureSingularName %>Form'];
    /* @ngInject */
    function <%= featureSingularName %>Controller(logger,
        $stateParams,
        $state,
        <%= featureSingularName %>,
        TableSettings,
        <%= featureSingularName %>Form) {

        var vm = this;

        // This is used to load the data into the table. 
        // See http://ng-table.com/ and app/core/services/table.settings.service.js
        vm.tableParams = TableSettings.getParams(<%= featureSingularName %>);
        vm.<%= camelizedSingularName %> = {};

        // Setup the form fields. Used by angular-formly to create the fields for the form. 
        // See http://angular-formly.com/ and services/<%= slugifiedName %>.form.client.service.js and views/create.html
        vm.setFormFields = function(disabled) {
            vm.formFields = <%= featureSingularName %>Form.getFormFields(disabled);
        };

        // Create new <%= featureSingularName %>        
        vm.create = function() {
            // Create new <%= featureSingularName %> object
            var <%= camelizedSingularName %> = new <%= featureSingularName %>(vm.<%= camelizedSingularName %>);

            // Redirect after save
            <%= camelizedSingularName %>.$save(function(response) {
                logger.success('<%= featureSingularName %> created');
                $state.go("app.view<%= camelizedSingularName %>", {'<%= camelizedSingularName %>Id': response.id});
            }, function(errorResponse) {
                vm.error = errorResponse;
            });
        };

        // Remove existing <%= featureSingularName %>
        vm.remove = function(<%= camelizedSingularName %>) {

            if (<%= camelizedSingularName %>) {
                <%= camelizedSingularName %> = <%= featureSingularName %>.get({<%= camelizedSingularName %>Id:<%= camelizedSingularName %>.id}, function() {
                    <%= camelizedSingularName %>.$remove(function() {
                        logger.success('<%= featureSingularName %> deleted');
                        vm.tableParams.reload();
                    });
                });
            } else {
                vm.<%= camelizedSingularName %>.$remove(function() {
                    logger.success('<%= featureSingularName %> deleted');
                    $state.go("app.list<%= camelizedSingularName %>");
                });
            }

        };

        // Update existing <%= featureSingularName %>
        vm.update = function() {
            var <%= camelizedSingularName %> = vm.<%= camelizedSingularName %>;

            <%= camelizedSingularName %>.$update(function() {
                logger.success('<%= featureSingularName %> updated');
                $state.go("app.list<%= camelizedSingularName %>");
            }, function(errorResponse) {
                vm.error = errorResponse.data.summary;
                logger.error("Update Error " + errorResponse);
            });
        };

        // Ensure form fields are set for view and edit
        vm.view<%= featureSingularName %> = function() {
            if($stateParams.<%= camelizedSingularName %>Id) {
                vm.<%= camelizedSingularName %> = <%= featureSingularName %>.get({<%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id}, vm.successResponse, vm.errorResponse);
                vm.setFormFields(true);
            } else {
                console.log("<%= featureSingularName %>Controller: $stateParams.<%= camelizedSingularName %>Id is blank");
            }
        };

        vm.edit<%= featureSingularName %> = function() {
            if($stateParams.<%= camelizedSingularName %>Id) {
                vm.<%= camelizedSingularName %> = <%= featureSingularName %>.get({<%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id}, vm.successResponse, vm.errorResponse);
                vm.setFormFields(false);
            } else {
                console.log("<%= featureSingularName %>Controller: $stateParams.<%= camelizedSingularName %>Id is blank");
            }
        };

		vm.errorResponse = function(response) {
			// Error
			if (response.status === 404) {
				logger.error("Not found");
			} else if (response.status === 403) {
				logger.error("No access");
			} else {
				logger.error("Error: " + response);
			}
		}

		vm.successResponse = function(response) {
			
		}
        // Called to initialize the controller
        activate();

        function activate() {

            $scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        
                console.log("<%= featureSingularName %>Controller: $state.name = " + toState.name);
                // Load data for this route to use
                switch (toState.name) {
                    case "app.view<%= featureSingularName %>":
                        vm.view<%= featureSingularName %>();
                        break;
                    case "app.list<%= featureSingularName %>":
                        vm.loadAll();
                        break;
                    case "app.create<%= featureSingularName %>":
                        vm.setFormFields(false);
                        break;
                }
            }
        }
    }

})();
