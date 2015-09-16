/**
 * Created by scott on 8/3/15.
 */

    var app = angular.module("choreBag", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

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
        .otherwise('/');

}]);


