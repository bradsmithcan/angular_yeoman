'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:SubjectCtrl
 * @description
 * # SubjectCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('SubjectCtrl', function ($log, $scope, $state, $stateParams, api) {
        $scope.subject = {};

        $scope.editSubject = function () {
            $state.go('subjectEdit', {id: $stateParams.id});
        };

        $scope.deleteSubject = function () {
            $scope.subject.$delete().then(function (result) {
                $state.go('subjects');
            }).catch(function (error) {
                $log.error(error);
            });
        };

        function getSubject(id) {
            api.subjects.get({id: id}).$promise.then(function (result) {
                $scope.subject = result;
            }).catch(function (error) {
                $log.error(error);
            });
        }

        (function init() {
            if ($stateParams.id) {
                getSubject($stateParams.id);
            } else {
                $log.error("No ID given.")
            }
        })();
    });
