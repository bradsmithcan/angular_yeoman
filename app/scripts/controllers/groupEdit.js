'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:GroupEditCtrl
 * @description
 * # GroupEditCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
    .controller('GroupEditCtrl', function ($log, $scope, $state, $stateParams, $mdToast, $timeout, api) {
        $scope.group = {};
        $scope.participantEmailAddresses = [];

        $scope.saveGroup = function () {
            if ($scope.group.id != null) {
                updateGroup($scope.group);
            } else {
                createGroup($scope.group);
            }
        };

        function createGroup(group) {
            group.organisation = 1;

            group.$save().then(function (result) {
                $state.go('groups');
            }).catch(function (error) {
                $log.debug(error);
                $log.debug(group);
            });
        }

        function updateGroup(group) {
            group.$update().then(function (result) {
                $state.go('groups');
            }).catch(function (error) {
                $log.debug(error);
                $log.debug(group);
            });
        }

        function getGroup(id) {
            api.groups.get({id: id}).$promise.then(function (result) {
                $scope.group = result;
                $log.debug(result);
            }).catch(function (error) {
                $log.error(error);
            });
        }

        $scope.deleteGroup = function() {
            $scope.group.$delete().then(function (result) {
                $state.go('groups');
            }).catch(function (error) {
                $log.error(error);
            });
        };

        // dennis@evalytics.nl, kim@evalytics.nl, tijmen@evalytics.nl, pascal@digitalefactuur.nl, ravi@digitalefactuur.nl
        $scope.addParticipants = function () {
            if (!$scope.group.participants) {
                $scope.group.participants = [];
            }

            angular.forEach($scope.participantEmailAddresses, function (address, index) {
                if (!$scope.group.participants.findByAttr('email', address)) {
                    $scope.group.participants.push({email:address});
                }
            });

            $scope.participantEmailAddresses = [];
        };

        $scope.removeParticipant = function(participant){
            $scope.group.participants.splice($scope.group.participants.indexOf(participant), 1);
        };

        /**
         * Set up the controller.
         */
        (function init() {
            if ($state.current.name == 'groupEdit' && $stateParams.id) {
                getGroup($stateParams.id);
            } else {
                $scope.group = new api.groups();
            }
        })();
    });
