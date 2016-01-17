// The resource used to interact with the REST service
(function() {
    'use strict';

    angular
        .module('app.<%= camelizedSingularName %>')
        .factory('<%= featureSingularName %>', <%= featureSingularName %>);

    <%= featureSingularName %>.$inject = ['$resource', 'API_BASE_URL'];
    /* @ngInject */
    function <%= featureSingularName %>($resource, API_BASE_URL) {

        var params = {
            <%= camelizedSingularName %>Id: '@id',
            format: 'json'
        };

        var actions = {
            update: {
                method: 'PUT'
            },
            delete: {
                method: 'DELETE'
            }
        };

        var API_URL = API_BASE_URL + '/<%= camelizedPluralName %>/:<%= camelizedSingularName %>Id';

        return $resource(API_URL, params, actions);

    }

})();
