
var exampleApp = angular.module('example-app',[
  'ftBarChart'
]);

exampleApp.controller('MainCtrl', function($scope) {
  $scope.mainVals = [4, 7, 9, 8, 12, 18, 20];

  $scope.testit = function() {
    var tempVals = [];
    for(i=0; i<12; i++)
    {
      tempVals.push( Math.floor((Math.random() * 20) + 1) );
    }

    $scope.mainVals = tempVals;
  }

});