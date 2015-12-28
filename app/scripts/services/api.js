'use strict';

/**
 * @ngdoc service
 * @name evalyticsApp.api
 * @description
 * # api
 * Service in the evalyticsApp.
 */
angular.module('evalyticsApp')
    .factory('api', function ($log, $resource, evaConfig) {
        var teachers = $resource(evaConfig.BASE_URL + '/topic/:id',
            {id: '@id', type: '2'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var subjects = $resource(evaConfig.BASE_URL + '/topic/:id',
            {id: '@id', type: '1'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var grades = $resource(evaConfig.BASE_URL + '/grade/:id',
            {id: '@id'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var evaluations = $resource(evaConfig.BASE_URL + '/evaluation/:id',
            {id: '@id'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var groups = $resource(evaConfig.BASE_URL + '/group/:id',
            {id: '@id'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var questionSets = $resource(evaConfig.BASE_URL + '/questionSet/:id',
            {id: '@id'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var questionScales = $resource(evaConfig.BASE_URL + '/questionScale/:id',
            {id: '@id'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        var topicTypes = $resource(evaConfig.BASE_URL + '/topicType/:id',
            {id: '@id', parent: '@parent'}, {
                query: {method: 'GET', isArray: false},
                update: {method: 'PUT'}
            });

        return {
            teachers: teachers,
            subjects: subjects,
            grades: grades,
            evaluations: evaluations,
            groups: groups,
            questionSets: questionSets,
            questionScales: questionScales,
            topicTypes: topicTypes
        };
    });
