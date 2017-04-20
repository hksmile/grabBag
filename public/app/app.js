/**
 * Created by scott on 8/3/15.
 */

    //var app = angular.module("choreBag", ['ngRoute']);

(function () {
    'use strict';

    angular
        .module('choreBag', ['ngRoute'])
        .config(config)
        .run(run);

    function config( $routeProvider) {


            $routeProvider
                .when('/', {
                    templateUrl: '/app/templates/grabBag.html',
                    controller: 'GrabBagController',
                    controllerAs: 'grabBag'
                })
                .when('/AddChore', {
                    templateUrl: '/app/templates/addChore.html',
                    controller: 'GrabBagController',
                    controllerAs: 'grabBag'
                })
                .when('/EditChore/:choreID', {
                    templateUrl: '/app/templates/editChore.html',
                    controller: 'EditGrabBagController',
                    controllerAs: 'editGrabBag'
                })
                .when('/Admin', {
                    templateUrl: '/app/templates/grabBagAdmin.html',
                    controller: 'GrabBagController',
                    controllerAs: 'grabBag'
                })
                .when('/account', {
                    templateUrl: '/app/templates/userAccount.html',
                    controller: 'AccountController',
                    controllerAs: 'vm'
                })
                .otherwise('/public');


    }

function run($http, $rootScope, $window) {
    // add JWT token as default auth header
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;


}

// manually bootstrap angular after the JWT token is retrieved from the server
$(function () {
    // get JWT token from server
    $.get('/app/token', function (token) {
        window.jwtToken = token;

        angular.bootstrap(document, ['app']);
    });
});

})();


