var myApp = angular.module('myApp', ['ngRoute'])

myApp.controller('myController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$http.get("/js/products.json").then(success, error)
	function error(response) {
		console.log("Something went wrong")
		console.log(response.status)
	}

	function success(response) {
		$scope.products = response.data
	}
}])

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('')
	$routeProvider
		.when('/login', {
			templateUrl: '/pages/login/login.html',
		})
		.when('/profile', {
			templateUrl: '/pages/profile/profile.html',
		})
		.when('/', {
			templateUrl: '/pages/home/home.html',
		})
		.when('/home', {
			templateUrl: '/pages/home/home.html',
		})

}])