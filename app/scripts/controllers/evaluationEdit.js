'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:EvaluationeditCtrl
 * @description
 * # EvaluationeditCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('EvaluationEditCtrl', function ($log, $scope, $state, $stateParams, $mdToast, $timeout, api) {
        $scope.evaluation = {};

        $scope.saveEvaluation = function () {
            if ($scope.evaluation.id != null) {
                updateEvaluation($scope.evaluation);
            } else {
                createEvaluation($scope.evaluation);
            }
        };

        function createEvaluation(evaluation) {
            subject.organisation = 1;

            evaluation.$save().then(function (result) {
                $state.go('evaluations');
            }).catch(function (error) {
                $log.debug(error);
            });
        }

        function updateEvaluation(evaluation) {
            evaluation.$update().then(function (result) {
                $state.go('evaluations');
            }).catch(function (error) {
                $log.debug(error);
            });
        }

        function getEvaluation(id) {
            api.evaluations.get({id: id}).$promise.then(function (result) {
                $scope.evaluation = result;
                $scope.evaluation.startDate = moment($scope.evaluation.startDate).toDate();
                $scope.evaluation.endDate = moment($scope.evaluation.endDate).toDate();
            }).catch(function (error) {
                $log.error(error);
            });
        }

        /**
         * Set up the controller.
         */
        (function init() {
            if ($state.current.name == 'evaluationEdit' && $stateParams.id) {
                getEvaluation($stateParams.id);
            } else {
                $scope.evaluation = new api.evaluations();
                $scope.evaluation.data = {};
                $scope.evaluation.data.types = [];
            }
        })();
    });
