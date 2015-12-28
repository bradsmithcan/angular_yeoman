'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:TeacherCtrl
 * @description
 * # TeacherCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('TeacherCtrl', function ($log, $scope, $state, $stateParams, api) {
        $scope.teacher = {};

        $scope.editTeacher = function () {
            $state.go('teacherEdit', {id: $stateParams.id});
        };

        $scope.deleteTeacher = function () {
            $scope.teacher.$delete().then(function (result) {
                $state.go('teachers');
            }).catch(function (error) {
                $log.error(error);
            });
        };

        function getTeacher(id) {
            api.teachers.get({id: id}).$promise.then(function (result) {
                $scope.teacher = result;
            }).catch(function (error) {
                $log.error(error);
            });
        }

        (function init() {
            if ($stateParams.id) {
                getTeacher($stateParams.id);
            } else {
                $log.error("No ID given.")
            }
        })();
    });
