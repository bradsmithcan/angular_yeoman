'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:GroupsCtrl
 * @description
 * # GroupsCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('GroupsCtrl', function ($log, $scope, $state, $stateParams, $timeout, api) {
        var searchAction;

        $scope.groups = [];
        $scope.searchQuery = null;
        $scope.pagination = {
            pageSize: 9,
            itemCount: 0,
            currentPage: 1,
            maxButtons: 5
        };

        $scope.showGroup = function (id) {
            $state.go('groupEdit', {id: id});
        };

        $scope.createGroup = function () {
            $state.go('groupCreate');
        };

        $scope.search = function () {
            if (searchAction) {
                $timeout.cancel(searchAction);
            }

            searchAction = $timeout(function () {
                $scope.pagination.currentPage = 1;
                $scope.getGroups();
            }, 150);
        };

        $scope.getGroups = function () {
            var options = {
                skip: ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize,
                limit: $scope.pagination.pageSize
            };

            if ($scope.searchQuery) {
                options.q = $scope.searchQuery;
            }

            api.groups.query(options).$promise.then(function (result) {
                $log.debug(result);
                $scope.groups = result.results;
                $scope.pagination.itemCount = result.metadata.resultset.count;
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.changePage = function () {
            $state.go($state.current.name, {page: $scope.pagination.currentPage}, {notify: false});
            $scope.getGroups();
        };

        /**
         * Set up the controller.
         */
        (function init() {
            $scope.pagination.currentPage = $stateParams.page || 1;
            $scope.getGroups();
        })();
    });
