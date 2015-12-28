'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:EvaluationsCtrl
 * @description
 * # EvaluationsCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('EvaluationsCtrl', function ($log, $scope, $state, $stateParams, $timeout, api) {
        var searchAction;

        $scope.evaluations = [];
        $scope.searchQuery = null;
        $scope.pagination = {
            pageSize: 9,
            itemCount: 0,
            currentPage: 1,
            maxButtons: 5
        };

        $scope.showEvaluation = function (id) {
            $state.go('evaluation', {id: id});
        };

        $scope.createEvaluation = function () {
            $state.go('evaluationCreate');
        };

        $scope.search = function () {
            if (searchAction) {
                $timeout.cancel(searchAction);
            }

            searchAction = $timeout(function () {
                $scope.pagination.currentPage = 1;
                $scope.getEvaluations();
            }, 150);
        };

        $scope.getEvaluations = function () {
            var options = {
                skip: ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize,
                limit: $scope.pagination.pageSize
            };

            if ($scope.searchQuery) {
                options.q = $scope.searchQuery;
            }

            api.evaluations.query(options).$promise.then(function (result) {
                $log.debug(result);
                $scope.evaluations = result.results;
                $scope.pagination.itemCount = result.metadata.resultset.count;
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.changePage = function () {
            $state.go($state.current.name, {page: $scope.pagination.currentPage}, {notify: false});
            $scope.getEvaluations();
        };

        /**
         * Set up the controller.
         */
        (function init() {
            $scope.pagination.currentPage = $stateParams.page || 1;
            $scope.getEvaluations();
        })();
    });
