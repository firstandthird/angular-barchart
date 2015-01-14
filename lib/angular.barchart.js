angular.module('ftBarChart', []).directive('barChart', ['$window', '$document', function($window, $document) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    link: function(scope, elem, attrs) {

      // Initialize functions in link scope
      var scale = function(max, min, num) {
        return (100 * (num - min) / (max - min)) || 0;
      }

      var calcVertPosition = function(height, totalHeight) {
        return (totalHeight - height);
      }

      var drawChart = function(chartValues) {
        var max = Math.max.apply(null, chartValues);
        var min = Math.min.apply(null, chartValues);

        elem.html('');

        var parts = [];

        for ( var i = 0; i < chartValues.length; i++ ) {
          parts.push( scale(max, min, chartValues[i]) );
        }

        console.log(parts);

        var x;
        var y;
        var height;
        var width = 100 / parts.length;

        var svgElem = angular.element('<svg width="' + chartWidth + '" height="' + chartHeight + '"/>');

        for (var i = 0; i < parts.length; i++) {
          var rect = $document[0].createElementNS('http://www.w3.org/2000/svg', 'rect');
          x = 100 * (i / parts.length);
          y = 100 - parts[i];
          height = parts[i] + 1;
          rect.setAttribute('title', chartValues[i]);
          rect.setAttribute('x', x + '%');
          rect.setAttribute('y', y + '%');
          rect.setAttribute('width', width + '%');
          rect.setAttribute('height', height + '%');
          rect.setAttribute('fill', chartColor);
          svgElem.append(rect);
        }

        elem.append( svgElem );
      }

      var chartHeight = (attrs.chartHeight)? attrs.chartHeight : 90;
      var chartWidth = (attrs.chartWidth)? attrs.chartWidth : 400;
      var chartColor = (attrs.chartColor)? attrs.chartColor : '#000';
      var data = scope.ngModel;

      scope.$watch('ngModel', function(newVal, oldVal) {
        console.log('Data Change!');
        drawChart( newVal );
      });
    }
  }
}]);