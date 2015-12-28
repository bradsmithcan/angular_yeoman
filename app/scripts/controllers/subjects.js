'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('SubjectsCtrl', function ($log, $scope, $state, $stateParams, $timeout, api) {
        var searchAction;

        $scope.subjects = [];
        $scope.searchQuery = null;
        $scope.pagination = {
            pageSize: 9,
            itemCount: 0,
            currentPage: 1,
            maxButtons: 5
        };

        $scope.showSubject = function (id) {
            $state.go('subject', {id: id});
        };

        $scope.createSubject = function () {
            $state.go('subjectCreate');
        };

        $scope.search = function () {
            if (searchAction) {
                $timeout.cancel(searchAction);
            }

            searchAction = $timeout(function () {
                $scope.pagination.currentPage = 1;
                $scope.getSubjects();
            }, 150);
        };

        $scope.getSubjects = function () {
            var options = {
                skip: ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize,
                limit: $scope.pagination.pageSize
            };

            if ($scope.searchQuery) {
                options.q = $scope.searchQuery;
            }

            api.subjects.query(options).$promise.then(function (result) {
                $log.debug(result);
                $scope.subjects = result.results;
                $scope.pagination.itemCount = result.metadata.resultset.count;
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.changePage = function () {
            $state.go($state.current.name, {page: $scope.pagination.currentPage}, {notify: false});
            $scope.getSubjects();
        };

        (function init() {
            $scope.pagination.currentPage = $stateParams.page || 1;
            $scope.getSubjects();
        })();
    });
