'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:EvaluationCtrl
 * @description
 * # EvaluationCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('EvaluationCtrl', function ($log, $scope, $state, $stateParams, api) {
        $scope.evaluation = {};

        $scope.editEvaluation = function () {
            $state.go('evaluationEdit', {id: $stateParams.id});
        };

        $scope.deleteEvaluation = function () {
            $scope.evaluation.$delete().then(function (result) {
                $state.go('evaluations');
            }).catch(function (error) {
                $log.error(error);
            });
        };

        function getEvaluation(id) {
            api.evaluations.get({id: id}).$promise.then(function (result) {
                $scope.evaluation = result;
            }).catch(function (error) {
                $log.error(error);
            });
        }

        /**
         * Set up the controller.
         */
        (function init() {
            if ($stateParams.id) {
                getEvaluation($stateParams.id);
            } else {
                $log.error("No ID given.")
            }
        })();
    });
