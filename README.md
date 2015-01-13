## Angular BarChart Directive

A reusable angular.js directive that will render a bar chart based upon data passed from the controller.

In your app config, add the directive as a dependancy injection like so

```javascript
app = angular.module('appName', [
   'ftBarChart'
]);
```

Use the directive by placing the code tag as follows:

```html
<div bar-chart ng-model="data"></div>
```

Defaults are in place for all the chart configurations, however the following configurations may be added as attributes to the directive element.

```javascript
chart-height="200" 
chart-width="778" 
chart-color="rgba(99,99,99,0.3)"
```

The data that fills the chart is passed by reference to the directive from the scope of the parent controller defined by the ng-model attribute.

```javascript
// Controller File
app.controller('someCtrl', ['$scope', function($scope){
  $scope.someData = [12, 15, 36, 8, 14, 20, 45, 18, 20, 27, 37, 48, 60, 30, 55, 80];
}]);

// View
<div bar-chart ng-model="someData"></div>
```
