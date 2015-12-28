'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:TeachersCtrl
 * @description
 * # TeachersCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('TeachersCtrl', function ($log, $scope, $state, $stateParams, $timeout, api) {
        var searchAction;

        $scope.teachers = [];
        $scope.searchQuery = null;
        $scope.pagination = {
            pageSize: 9,
            itemCount: 0,
            currentPage: 1,
            maxButtons: 5
        };

        $scope.showTeacher = function (id) {
            $state.go('teacher', {id: id});
        };

        $scope.createTeacher = function () {
            $state.go('teacherCreate');
        };

        $scope.search = function () {
            if (searchAction) {
                $timeout.cancel(searchAction);
            }

            searchAction = $timeout(function () {
                $scope.pagination.currentPage = 1;
                $scope.getTeachers();
            }, 150);
        };

        $scope.getTeachers = function () {
            var options = {
                skip: ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize,
                limit: $scope.pagination.pageSize
            };

            if ($scope.searchQuery) {
                options.q = $scope.searchQuery;
            }

            api.teachers.query(options).$promise.then(function (result) {
                $log.debug(result);
                $scope.teachers = result.results;
                $scope.pagination.itemCount = result.metadata.resultset.count;
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.changePage = function () {
            $state.go($state.current.name, {page: $scope.pagination.currentPage}, {notify: false});
            $scope.getTeachers();
        };

        (function init() {
            $scope.pagination.currentPage = $stateParams.page || 1;
            $scope.getTeachers();
        })();
    });
