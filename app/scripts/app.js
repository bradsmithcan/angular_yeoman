'use strict';

/**
 * @ngdoc overview
 * @name evalyticsApp
 * @description
 * # evalyticsApp
 *
 * Main module of the application.
 */
angular
    .module('evalyticsApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngMaterial',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.router'
    ])

    // Route provider config.
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/teachers');
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

            // Teacher list
            .state('teachers', {
                url: '/teachers?page',
                templateUrl: 'views/teachers.html',
                controller: 'TeachersCtrl'
            })
            // Teacher create
            .state('teacherCreate', {
                url: '/teachers/create',
                templateUrl: 'views/teacher-edit.html',
                controller: 'TeacherEditCtrl'
            })
            // Teacher detail
            .state('teacher', {
                url: '/teachers/:id',
                templateUrl: 'views/teacher.html',
                controller: 'TeacherCtrl'
            })
            // Teacher edit
            .state('teacherEdit', {
                url: '/teachers/:id/edit',
                templateUrl: 'views/teacher-edit.html',
                controller: 'TeacherEditCtrl'
            })

            // Subject list
            .state('subjects', {
                url: '/subjects?page',
                templateUrl: 'views/subjects.html',
                controller: 'SubjectsCtrl'
            })
            // Subject create
            .state('subjectCreate', {
                url: '/subjects/create',
                templateUrl: 'views/subject-edit.html',
                controller: 'SubjectEditCtrl'
            })
            // Subject detail
            .state('subject', {
                url: '/subjects/:id',
                templateUrl: 'views/subject.html',
                controller: 'SubjectCtrl'
            })
            // Subject edit
            .state('subjectEdit', {
                url: '/subjects/:id/edit',
                templateUrl: 'views/subject-edit.html',
                controller: 'SubjectEditCtrl'
            })

            // Evaluation list
            .state('evaluations', {
                url: '/evaluations?page',
                templateUrl: 'views/evaluations.html',
                controller: 'EvaluationsCtrl'
            })
            // Evaluation create
            .state('evaluationCreate', {
                url: '/evaluations/create',
                templateUrl: 'views/evaluation-edit.html',
                controller: 'EvaluationEditCtrl'
            })
            // Evaluation detail
            .state('evaluation', {
                url: '/evaluations/:id',
                templateUrl: 'views/evaluation.html',
                controller: 'EvaluationCtrl'
            })
            // Evaluation edit
            .state('evaluationEdit', {
                url: '/evaluations/:id/edit',
                templateUrl: 'views/evaluation-edit.html',
                controller: 'EvaluationEditCtrl'
            })

            // Group list
            .state('groups', {
                url: '/groups?page',
                templateUrl: 'views/groups.html',
                controller: 'GroupsCtrl'
            })
            // Evaluation create
            .state('groupCreate', {
                url: '/groups/create',
                templateUrl: 'views/group-edit.html',
                controller: 'GroupEditCtrl'
            })
            // Evaluation edit
            .state('groupEdit', {
                url: '/groups/:id/edit',
                templateUrl: 'views/group-edit.html',
                controller: 'GroupEditCtrl'
            })

            // QuestionSet list
            .state('questionSets', {
                url: '/questionSets?page',
                templateUrl: 'views/question-sets.html',
                controller: 'QuestionSetsCtrl'
            })
            // QuestionSet create
            .state('questionSetCreate', {
                url: '/questionSets/create',
                templateUrl: 'views/question-set-edit.html',
                controller: 'QuestionSetEditCtrl'
            })
            // QuestionSet edit
            .state('questionSetEdit', {
                url: '/questionSets/:id/edit',
                templateUrl: 'views/question-set-edit.html',
                controller: 'QuestionSetEditCtrl'
            })
    })

    // Material Design theme config.
    .config(function ($mdThemingProvider) {
        // Custom background theme
        $mdThemingProvider.definePalette('background', $mdThemingProvider.extendPalette('grey', {
            'A100': 'fafafa'
        }));

        // Default theme.
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('amber')
            .backgroundPalette('background');

        $mdThemingProvider.setDefaultTheme('default');
    })

    // Translate provider config.
    .config(function ($translateProvider) {
        $translateProvider.translations('nl', {
            EVALYTICS: 'Evalytics',

            TEACHER: 'Docent',
            TEACHERS: 'Docenten',
            SUBJECT: 'Vak',
            SUBJECTS: 'Vakken',
            EVALUATION: 'Evaluatie',
            EVALUATIONS: 'Evaluaties',
            GROUP: 'Groep',
            GROUPS: 'Groepen',
            QUESTION_SET: 'Vragenset',
            QUESTION_SETS: 'Vragensets',

            QUESTION: 'Vraag',
            SCALE: 'Schaal',
            TYPE: 'Type',

            AVERAGE: 'Gemiddelde',
            NAME: 'Naam',
            GRADE: 'Leerjaar',
            SUBJECT_COORDINATOR: 'Module coordinator',
            SUBJECT_COORDINATOR_ABBR: 'Coordinator',
            SELECT_TEACHER: 'Selecteer een docent',
            SELECT_GRADE: 'Selecteer een leerjaar',
            GUEST_TEACHER: 'Gastdocent',



            TYPELABEL: 'Specify the course',
            SELECT_YEAR: 'Studie jaar',
            SEMINAR: 'Seminar',
            LECTURE: 'Lezing',
            INTERNSHIP: 'Stage',

            ALERT_TITLE: 'Attention!',
            ALERT_CONTENT: 'Please add course type first',
            ALERT_BUTTON: 'Close',


            FIRST_NAME: 'Voornaam',
            PREFIX: 'Tussenvoegsel',
            LAST_NAME: 'Achternaam',
            CODE: 'Code',
            EMAIL_ADDRESS: 'E-mailadres',
            EMAIL_ADDRESSES: 'E-mailadressen',
            PHONE_NUMBER: 'Telefoonnummer',

            GROUP_ADD_EMAIL_HINT: 'Komma-gescheiden',

            DESCRIPTION: 'Omschrijving',
            START_DATE: 'Startdatum',
            END_DATE: 'Einddatum',

            SEARCH: 'Zoeken',
            SAVE: 'Opslaan',
            ADD: 'Toevoegen',
            DELETE: 'Delete'
        });

        $translateProvider.translations('en', {
            EVALYTICS: 'Evalytics',

            TEACHER: 'Teacher',
            TEACHERS: 'Teachers',
            SUBJECT: 'Subject',
            SUBJECTS: 'Subjects',
            EVALUATION: 'Evaluation',
            EVALUATIONS: 'Evaluations',
            GROUP: 'Group',
            GROUPS: 'Groups',
            QUESTION_SET: 'Question set',
            QUESTION_SETS: 'Question sets',

            QUESTION: 'Question',
            SCALE: 'Scale',
            TYPE: 'Type',

            AVERAGE: 'Average',
            NAME: 'Name',
            GRADE: 'Grade',
            SUBJECT_COORDINATOR: 'Subject coordinator',
            SUBJECT_COORDINATOR_ABBR: 'Coordinator',
            SELECT_TEACHER: 'Select a teacher',
            SELECT_GRADE: 'Select a grade',
            GUEST_TEACHER: 'Guest teacher',



            TYPELABEL: 'Specify the course',
            SELECT_YEAR: 'Study year',
            SEMINAR: 'Seminar',
            LECTURE: 'Lecture',
            INTERNSHIP: 'Internship',

            ALERT_TITLE: 'Attention!',
            ALERT_CONTENT: 'Please add course type first',
            ALERT_BUTTON: 'Close',
            ALERT: 'Close!!!',


            FIRST_NAME: 'First name',
            PREFIX: 'Prefix',
            LAST_NAME: 'Last name',
            CODE: 'Code',
            EMAIL_ADDRESS: 'Email address',
            EMAIL_ADDRESSES: 'Email addresses',
            PHONE_NUMBER: 'Telephone number',

            GROUP_ADD_EMAIL_HINT: 'Comma seperated',

            DESCRIPTION: 'Description',
            START_DATE: 'Start date',
            END_DATE: 'End date',

            SEARCH: 'Search',
            SAVE: 'Save',
            ADD: 'Add',
            DELETE: 'Delete'
        });

        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('en');
    });
