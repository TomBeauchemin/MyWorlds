angular.module('myApp', ['ionic'])

.controller('PopupCtrl',function($scope, $ionicPopup) {

    // An elaborate, custom popup
    $scope.loginForm = function() {
       window.alert(0);
    };
});