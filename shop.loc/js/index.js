$(document).ready(function () {
	setTimeout(function () {
		$('.loading').hide()
		$('.loading').remove()
	}, 500)
})

var myApp = angular.module('myApp', ['ngRoute'])

myApp.controller('myController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	function error(response) {
		console.log("Something went wrong")
		console.log(response.status)
	}

	$http.get("./js/products.json").then(function (response) {
		$scope.products = response.data
	}, error)

	$http.get("./js/cart_products.json").then(function (response) {
		$scope.cart_products = response.data
	}, error)

	$http.get("./js/addresses.json").then(function (response) {
		$scope.addresses = response.data
	}, error)

	$http.get("./js/orders.json").then(function (response) {
		$scope.orders = response.data
	}, error)
}])

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('')
	$routeProvider
		.when('/aordershistory', {
			templateUrl: './pages/aordershistory/aordershistory.html',
		})
		.when('/categories', {
			templateUrl: './pages/categories/categories.html',
		})
		.when('/orders', {
			templateUrl: './pages/orders/orders.html',
		})
		.when('/cart', {
			templateUrl: './pages/cart/cart.html',
		})
		.when('/login', {
			templateUrl: './pages/login/login.html',
		})
		.when('/addresses', {
			templateUrl: './pages/addresses/addresses.html',
		})
		.when('/edit_address', {
			templateUrl: './pages/addresses/edit_address.html',
		})
		.when('/create_address', {
			templateUrl: './pages/addresses/edit_address.html',
		})
		.when('/profile', {
			templateUrl: './pages/profile/profile.html',
		})
		.when('/registration', {
			templateUrl: './pages/profile/profile.html',
		})
		.when('/', {
			templateUrl: './pages/home/home.html',
		})
		.when('/home', {
			templateUrl: './pages/home/home.html',
		})
}])