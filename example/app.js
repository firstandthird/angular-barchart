
var exampleApp = angular.module('example-app',[
  'ftBarChart'
]);

exampleApp.controller('MainCtrl', function($scope) {
  $scope.mainVals = [4, 7, 9, 8, 12, 18, 20];
  $scope.dictVals = [
    { name: 'blah', value: 4 },
    { name: 'blah2', value: 7 },
    { name: 'blah3', value: 9 },
    { name: 'blah4', value: 8 },
    { name: 'blah5', value: 12 },
    { name: 'blah6', value: 18 },
    { name: 'blah7', value: 20 }
  ];

  $scope.testit = function() {
    var tempVals = [];

    for(var i = 0; i < 7; i++) {
      tempVals.push(Math.floor((Math.random() * 20) + 1));
      $scope.dictVals[i].value = Math.floor((Math.random() * 20) + 1);
    }

    $scope.mainVals = tempVals;
  }
});
