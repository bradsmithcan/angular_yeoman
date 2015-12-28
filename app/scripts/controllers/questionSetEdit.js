'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:QuestionseteditCtrl
 * @description
 * # QuestionseteditCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('QuestionSetEditCtrl', function ($log, $scope, $state, $stateParams, $mdToast, $timeout, api) {
        $scope.questionSet = {};

        $scope.saveQuestionSet = function () {
            if ($scope.questionSet.id != null) {
                updateQuestionSet($scope.questionSet);
            } else {
                createQuestionSet($scope.questionSet);
            }
        };

        function createQuestionSet(questionSet) {
            questionSet.organisation = 1;

            questionSet.$save().then(function (result) {
                $state.go('questionSets');
            }).catch(function (error) {
                $log.debug(error);
                $log.debug(questionSet);
            });
        }

        function updateQuestionSet(questionSet) {
            questionSet.$update().then(function (result) {
                $state.go('questionSets');
            }).catch(function (error) {
                $log.debug(error);
                $log.debug(questionSet);
            });
        }

        function getQuestionSet(id) {
            api.questionSets.get({id: id}).$promise.then(function (result) {
                $scope.questionSet = result;
                $log.debug(result);
            }).catch(function (error) {
                $log.error(error);
            });
        }

        $scope.deleteQuestionSet = function () {
            $scope.questionSet.$delete().then(function (result) {
                $state.go('questionSets');
            }).catch(function (error) {
                $log.error(error);
            });
        };

        $scope.addQuestion = function () {
            // TODO: Implement this.
        };

        $scope.removeQuestion = function () {
            // TODO: Implement this.
        };

        function getQuestionScales() {
            api.questionScales.get().$promise.then(function (result) {
                $scope.questionScales = result.results;
                $log.debug(result);
            }).catch(function (error) {
                $log.error(error);
            });
        }

        $scope.getQuestionTypes = function () {
            // TODO: Implement this.
        };

        /**
         * Set up the controller.
         */
        (function init() {
            if ($state.current.name == 'questionSetEdit' && $stateParams.id) {
                getQuestionSet($stateParams.id);
            } else {
                $scope.questionSet = new api.questionSets();
            }

            getQuestionScales();
        })();
    });
