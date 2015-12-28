'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:QuestionsetCtrl
 * @description
 * # QuestionsetCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('QuestionSetsCtrl', function ($log, $scope, $state, $stateParams, $timeout, api) {
        var searchAction;

        $scope.questionSets = [];
        $scope.searchQuery = null;
        $scope.pagination = {
            pageSize: 9,
            itemCount: 0,
            currentPage: 1,
            maxButtons: 5
        };

        $scope.showQuestionSet = function (id) {
            $state.go('questionSetEdit', {id: id});
        };

        $scope.createQuestionSet = function () {
            $state.go('questionSetCreate');
        };

        $scope.search = function () {
            if (searchAction) {
                $timeout.cancel(searchAction);
            }

            searchAction = $timeout(function () {
                $scope.pagination.currentPage = 1;
                $scope.getQuestionSets();
            }, 150);
        };

        $scope.getQuestionSets = function () {
            var options = {
                skip: ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize,
                limit: $scope.pagination.pageSize
            };

            if ($scope.searchQuery) {
                options.q = $scope.searchQuery;
            }

            api.questionSets.query(options).$promise.then(function (result) {
                $log.debug(result);
                $scope.questionSets = result.results;
                $scope.pagination.itemCount = result.metadata.resultset.count;
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.changePage = function () {
            $state.go($state.current.name, {page: $scope.pagination.currentPage}, {notify: false});
            $scope.getQuestionSets();
        };

        /**
         * Set up the controller.
         */
        (function init() {
            $scope.pagination.currentPage = $stateParams.page || 1;
            $scope.getQuestionSets();
        })();
    });
