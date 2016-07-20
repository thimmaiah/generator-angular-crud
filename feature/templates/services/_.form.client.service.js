(function() {
    'use strict';

    angular
        .module('app.<%= camelizedSingularName %>')
        .factory('<%= featureSingularName %>Form', factory);

    function factory() {

        var getFormFields = function(disabled) {

            var fields = [

                <% var fieldLength = 0; for (var f in fieldMap) { %> 
	            {
	                key: '<%= f %>',
	                type: 'input',
	                templateOptions: {
	                    label: '<%= f.capitalize() %>:',
	                    disabled: disabled,
	                    required: true,
	                    type: '<%= fieldMap[f] %>'
	                }
	            },
	            <% fieldLength = fieldLength + 1;} %>

            ];

            return fields;

        };

        var service = {
            getFormFields: getFormFields
        };

        return service;

    }

})();
