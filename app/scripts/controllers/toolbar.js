'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('ToolbarCtrl', function ($rootScope, $scope, $state) {
        $scope.selectedTab = 0;

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            switch (toState.name) {
                case 'teachers':
                case 'teacher':
                case 'teacherCreate':
                case 'teacherEdit':
                    $scope.selectedTab = 0;
                    break;
                case 'subjects':
                case 'subject':
                case 'subjectCreate':
                case 'subjectEdit':
                    $scope.selectedTab = 1;
                    break;
                case 'evaluations':
                case 'evaluation':
                case 'evaluationCreate':
                case 'evaluationEdit':
                    $scope.selectedTab = 2;
                    break;
                case 'groups':
                case 'groupCreate':
                case 'groupEdit':
                    $scope.selectedTab = 3;
                    break;
                case 'questionSets':
                case 'questionSetCreate':
                case 'questionSetEdit':
                    $scope.selectedTab = 4;
                    break;
                default:
                    $scope.selectedTab = 0;
                    break;
            }
        });
    });
