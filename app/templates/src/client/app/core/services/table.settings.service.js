/* jshint ignore:start */

(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('TableSettings', factory);

    factory.$inject = ['NgTableParams', 'logger'];
    /* @ngInject */
    function factory(NgTableParams, logger) {

        var previousEntity;

        var getData = function(Entity) {
            return function($defer, params) {
                
                if (previousEntity !== Entity) {
                    previousEntity = Entity;
                }

                Entity.query(params.url(), function(response) {
                    params.total(response.total);
                    $defer.resolve(response);
                });
            };
        };

        var params = {
            page: 1,
            count: 5
        };

        var settings = {
            total: 0,
            counts: [5, 10, 15],
            filterDelay: 0
        };

        var tableParams = new NgTableParams(params, settings);

        var getParams = function(Entity) {
            tableParams.settings({getData: getData(Entity)});
            return tableParams;
        };

        var service = {
            getParams: getParams
        };

        return service;

    }


})();
