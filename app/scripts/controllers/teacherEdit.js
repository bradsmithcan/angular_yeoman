'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:TeacherEditCtrl
 * @description
 * # TeacherDditCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('TeacherEditCtrl', function ($log, $scope, $state, $stateParams, $mdToast, api) {
        $scope.teacher = {};

        $scope.saveTeacher = function () {
            if ($scope.teacher.id != null) {
                updateTeacher($scope.teacher);
            } else {
                createTeacher($scope.teacher);
            }
        };

        function createTeacher(teacher) {
            teacher.name = [teacher.data.firstName, teacher.data.prefix, teacher.data.lastName].join(" ");
            teacher.type = 'teacher';
            teacher.organisation = 1;

            teacher.$save().then(function (result) {
                $state.go('teachers');
            }).catch(function (error) {
                $log.debug(error);
            });
        }

        function updateTeacher(teacher) {
            teacher.name = [teacher.data.firstName, teacher.data.prefix, teacher.data.lastName].join(" ");

            teacher.$update().then(function (result) {
                $state.go('teachers');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Simple Toast!')
                        .position('top right')
                        .hideDelay(3000)
                );
            }).catch(function (error) {
                $log.debug(error);
            });
        }

        function getTeacher(id) {
            api.teachers.get({id: id}).$promise.then(function (result) {
                $scope.teacher = result;
            }).catch(function (error) {
                $log.error(error);
            });
        }

        (function init() {
            if ($state.current.name == 'teacherEdit' && $stateParams.id) {
                $log.debug('teacherEdit');
                getTeacher($stateParams.id);
            } else {
                $log.debug('teacherCreate');
                $scope.teacher = new api.teachers()
            }
        })();
    });
