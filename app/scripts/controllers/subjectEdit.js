'use strict';

/**
 * @ngdoc function
 * @name evalyticsApp.controller:SubjecteditCtrl
 * @description
 * # SubjecteditCtrl
 * Controller of the evalyticsApp
 */
angular.module('evalyticsApp')
  .controller('SubjectEditCtrl', function ($log, $scope, $state, $stateParams, $mdToast, $timeout, $mdDialog, $translate, $q, api) {
    $scope.subject = {};
    $scope.teachers = [];
    $scope.grades = [];
    $scope.subjectTypes = [];
    $scope.teacherTypes = [];
    $scope.saveSubject = function () {
      if ($scope.subject.id != null) {
        updateSubject($scope.subject);
      } else {
        createSubject($scope.subject);
      }
    };

    function createSubject(subject) {
      subject.name = subject.data.name;
      subject.type = 'subject';
      subject.organisation = 1;

      subject.$save().then(function (result) {
        $state.go('subjects');
      }).catch(function (error) {
        $log.debug(error);
      });
    }

    function updateSubject(subject) {
      subject.name = subject.data.name;

      subject.$update().then(function (result) {
        $state.go('subjects');
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

    function getSubject(id) {
      api.subjects.get({id: id}).$promise.then(function (result) {
        $scope.subject = result;
      }).catch(function (error) {
        $log.error(error);
      });
    }

    /*
     * Grade selection
     */

    function getGrades() {
      api.grades.query().$promise.then(function (result) {
        $log.debug(result);
        $scope.grades = result.results;
      }).catch(function (error) {
        $log.error(error);
      });
    }

    $scope.selectGrade = function (id) {
      if(!$scope.selectedCourse){
        $scope.gradeId = undefined;
        showAlert();
        return;
      }
      console.log(id);
      if (id == null) {
        return;
      }

      //if (!$scope.subject.data.grades) {
        $scope.subject.data.grades = [];
      //}
      //$scope.selectedCourse[$scope.selectedCourseID].grades.push($scope.grades.findByAttr('id', id));
      //console.log($scope.selectedCourse[$scope.selectedCourseID]);
      //console.log($scope.selectedCourse);
      for(var i = 0; i < id; i++) {
        var j = i + 1;
          $scope.subject.data.grades.push($scope.grades.findByAttr('id', j));
        //if (!$scope.subject.data.grades.findByAttr('id', id)) {
        //  $scope.subject.data.grades.push($scope.grades.findByAttr('id', id));
        //}
      }
    };

    $scope.removeGrade = function (id) {
      console.log(id);
      $scope.hideClass = true;
      var delTime = window.setInterval(rotate, 100);
      $scope.subject.data.grades.splice($scope.subject.data.grades.findIndexByAttr('id', id), 1);
      $scope.gradeId = $scope.subject.data.grades.length;
      $timeout(function(){
        var c = angular.element(document.getElementById('checkboxList'));
        var d = angular.element(document.getElementById('select_container_10'));
        var cc = c.find('md-list-item').length;

        if(cc === 0){
          $scope.gradeId = undefined;
          c.find('md-input-container').removeClass('md-input-has-value');
          d.find('md-option').attr('aria-selected', false);
          c.find('label').addClass('md-placeholder');
          c .find('md-select').removeClass('ng-dirty').attr('style', '')
            .removeClass('ng-valid-parse').addClass('ng-pristine').attr('aria-label', 'Study year');
          c .find('md-select-value').html('<span>Study year</span><span class="md-select-icon" aria-hidden="true"></span>').addClass('md-select-placeholder');
        }
        $scope.hideClass = false;
        clearInterval(delTime);
      }, 1000);
    };

    var count = 0;

    function rotate() {
      var elem2 = angular.element(document.getElementsByClassName('loading'));
      elem2.attr('style', 'transform: scale(0.5) rotate(' + count + 'deg)');
      if (count == 360) {
        count = 0
      }
      count += 45;
    }



    $scope.togglePeriod = function (gradeId, id) {
      var grade = $scope.subject.data.grades.findByAttr('id', gradeId);
      var period = grade.data.periods.findByAttr('name', id);
      period.selected = !period.selected;
    };

    $scope.selected = false;

    $scope.isPeriodSelected = function (gradeId, id) {
      console.log(gradeId);
      return;
      var grade = $scope.subject.data.grades.findByAttr('id', gradeId);
      return grade.data.periods.findByAttr('name', (id-1)).selected;
    };

    $scope.blabla = function(data){
      if(angular.isDefined(data)){
        $scope.selectedCourse = data;
        console.log(data)
      }
    };

    $scope.tagDeleted = function (data){
      $timeout(function() {
        var current = angular.element(document).find('md-chip');
        if(current.length === 0){
          angular.forEach($scope.subject.data.grades, function(grade){
            $timeout(function(){
              $scope.removeGrade(grade.id);
            }, 1000)
          });
          angular.forEach($scope.subject.data.teachers, function(teacher){
            $timeout(function(){
              $scope.removeTeacher(teacher.id);
            }, 1000)
          });
          $scope.selectedCourse = null;
        }
      }, 100);
      console.log(data)
    };

    $scope.selectedCourse = null;
    $scope.selectCourse = function(event, data){
      var current = angular.element(event.currentTarget).controller('mdChips').selectedChip;
      if (current > -1){
        var currentCourse = data[current];
        $scope.selectedCourse = data;
        $scope.selectedCourseID = current;
        $scope.selectedCourse[$scope.selectedCourseID].grades = [];
        console.log($scope.selectedCourse);
      }
    };

    /*
     * Teacher selection
     */

    function getTeachers() {
      api.teachers.query().$promise.then(function (result) {
        $log.debug(result);
        $scope.teachers = result.results;
        $log.debug($scope.subject);
      }).catch(function (error) {
        $log.error(error);
      });
    }

    $scope.searchTeacher = function (query) {
      var results = [];
      angular.forEach($scope.teachers, function (teacher, index) {
        if (teacher.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          teacher.data.code.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          results.push(teacher);
        }
      });
      return results;
    };

    $scope.selectTeacher = function (id) {
      if (id == null) {
        return;
      }

      if(!$scope.selectedCourse){
        $scope.teacherSearch = '';
        showAlert();
        return;
      }

      if (!$scope.subject.data.teachers) {
        $scope.subject.data.teachers = [];
      }

      if (!$scope.subject.data.teachers.findByAttr('id', id)) {
        $scope.subject.data.teachers.push($scope.teachers.findByAttr('id', id));
      }

      $scope.teacherSearch = null;
    };

    $scope.removeTeacher = function (id) {
      $scope.subject.data.teachers.splice($scope.subject.data.teachers.findIndexByAttr('id', id), 1);
    };

    $scope.toggleCoordinator = function (id) {
      var teacher = $scope.subject.data.teachers.findByAttr('id', id);
      teacher.isCoordinator = !teacher.isCoordinator;
    };

    $scope.isCoordinator = function (id) {
      return $scope.subject.data.teachers.findByAttr('id', id).isCoordinator;
    };

    $scope.toggleGuestTeacher = function (id) {
      var teacher = $scope.subject.data.teachers.findByAttr('id', id);
      teacher.isGuestTeacher = !teacher.isGuestTeacher;
    };

    $scope.isGuestTeacher = function (id) {
      return $scope.subject.data.teachers.findByAttr('id', id).isGuestTeacher;
    };

    /*
     * Type
     */

    function getSubjectTypes() {
      api.topicTypes.query({parent: '1'}).$promise.then(function (result) {
        $log.debug(result);
        $scope.subjectTypes = result.results;
        $log.debug($scope.subject);
      }).catch(function (error) {
        $log.error(error);
      });
    }

    function getTeacherTypes() {
      api.topicTypes.query({parent: '2'}).$promise.then(function (result) {
        $log.debug(result);
        $scope.teacherTypes = result.results;
        $log.debug($scope.subject);
      }).catch(function (error) {
        $log.error(error);
      });
    }

    $scope.getSubjectTypeTranslation = function (type) {
      return type;
    };

    $scope.isTypeSelected = function (teacherId, type) {
      var teacher = $scope.subject.data.teachers.findByAttr('id', teacherId);

      if (!teacher.types) {
        teacher.types = [];
      }
      return teacher.types.contains(type.id);
    };

    $scope.toggleType = function (teacherId, type) {
      var teacher = $scope.subject.data.teachers.findByAttr('id', teacherId);

      if (!teacher.types) {
        teacher.types = [];
      }

      if (teacher.types.contains(type.id)) {
        teacher.types.splice(teacher.types.indexOf(type.id), 1);
      } else {
        teacher.types.push(type.id);
      }
    };

    /**
     * Set up the controller.
     */
    (function init() {
      if ($state.current.name == 'subjectEdit' && $stateParams.id) {
        getSubject($stateParams.id);
      } else {
        $scope.subject = new api.subjects();
        $scope.subject.data = {};
        $scope.subject.data.types = [];
      }

      getTeachers();
      getGrades();
      getSubjectTypes();
      getTeacherTypes();
    })();
    angular.element(document).ready(function () {

      var temp = false;
      $("#input-12").focusin(function () {
        $(".a1").addClass("active");
      }).focusout(function () {
        if (!temp) {
          $(".a1").removeClass("active");
        }
      });

      $("#ul-12").on("click", function () {
        $(".a1").addClass("active");
      });

      $("#ul-12").on("mouseenter", function () {
        temp = true;
      }).on("mouseleave", function () {
        temp = false;
      });

    });

    function showAlert(content, title, button) {
      title = !title ? translateText('ALERT_TITLE') : translateText(title);
      content = !content ? translateText('ALERT_CONTENT') : translateText(content);
      button = !button ? translateText('ALERT_BUTTON') : translateText(button);
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(title)
          .textContent(content)
          .ok(button)
      )
    }

    function translateText(text){
      return $translate.instant(text)
    }

  });


