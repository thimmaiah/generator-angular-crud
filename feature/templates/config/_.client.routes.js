// The routes for <%= camelizedSingularName %>
(function() {
    'use strict';

    angular
        .module('app.<%= camelizedSingularName %>')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.list<%= featureSingularName %>',
                config: {
                    url: '/<%= slugifiedName %>',
                    templateUrl: 'app/<%= slugifiedName %>/views/list.html',
                    controller: '<%= featureSingularName %>Controller',
                    controllerAs: 'vm',
                    title: 'List <%= featurePluralName %>',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> <%= featurePluralName %>'
                    }
                }
            },
            {
                state: 'app.create<%= featureSingularName %>',
                config: {
                    url: '/<%= slugifiedName %>/create',
                    templateUrl: 'app/<%= slugifiedName %>/views/create.html',
                    controller: '<%= featureSingularName %>Controller',
                    controllerAs: 'vm',
                    title: 'Create <%= featureSingularName %>'
                }
            },
            {
                state: 'app.view<%= featureSingularName %>',
                config: {
                    url: '/<%= slugifiedName %>/:<%= camelizedSingularName %>Id',
                    templateUrl: 'app/<%= slugifiedName %>/views/view.html',
                    controller: '<%= featureSingularName %>Controller',
                    controllerAs: 'vm',
                    title: 'View <%= featureSingularName %>'
                }
            },
            {
                state: 'app.edit<%= featureSingularName %>',
                config: {
                    url: '/<%= slugifiedName %>/:<%= camelizedSingularName %>Id/edit',
                    templateUrl: 'app/<%= slugifiedName %>/views/edit.html',
                    controller: '<%= featureSingularName %>Controller',
                    controllerAs: 'vm',
                    title: 'Edit <%= featureSingularName %>'
                }
            }
        ];
    }
})();
