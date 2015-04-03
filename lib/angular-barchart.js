angular.module('ftBarChart', [])
  .directive('barChart', function($window, $document) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
      objectKey: '@?barchartValueKey',
      shouldAnimate: '&?barchartAnimate',
      animateDuration: '&?barchartAnimateDuration'
    },
    link: function(scope, elem, attrs) {
      var dictMode = false;
      var shouldAnimate = !!scope.shouldAnimate();
      var animateDuration = '500ms';

      if (shouldAnimate && angular.isDefined(attrs.barchartAnimateDuration)) {
        animateDuration = scope.animateDuration();
      }

      if (angular.isObject(scope.ngModel[0])) {
        if (!angular.isDefined(attrs.barchartValueKey)) {
          throw new Error('You must define a barchart-value-key to extract the value from the dict!');
        }

        dictMode = true;
      }

      // Initialize functions in link scope
      var scale = function(max, min, num) {
        var result;

        if (angular.isNumber(num)) {
          result = (100 * (num - min) / (max - min)) || 0;
        } else {
          result = 0;
        }

        return result;
      };

      var drawChart = function(chartValues) {
        var max = Math.max.apply(null, chartValues);
        var min = Math.min.apply(null, chartValues);
        var i = 0;
        var j = 0;
        var chartLength = chartValues.length;
        var partsLength;

        elem.html('');

        var parts = [];

        for (; i < chartLength; i++) {
          parts.push(scale(max, min, chartValues[i]));
        }

        var x, y, height;
        var width = 100 / parts.length;
        var svgElem = angular.element('<svg width="' + chartWidth + '" height="' + chartHeight + '"/>');
        partsLength = parts.length;

        for (; j < partsLength; j++) {
          var rect = $document[0].createElementNS('http://www.w3.org/2000/svg', 'rect');
          x = 100 * (j / parts.length);
          y = 100 - parts[j];
          height = parts[j] + 1;
          rect.setAttribute('title', chartValues[j]);
          rect.setAttribute('x', x + '%');
          rect.setAttribute('y', y + '%');
          rect.setAttribute('width', width + '%');
          rect.setAttribute('height', height + '%');
          rect.setAttribute('fill', chartColor);

          if (shouldAnimate) {
            var animate = $document[0].createElementNS('http://www.w3.org/2000/svg', 'animate');

            animate.setAttribute('attributeName', 'y');
            animate.setAttribute('from', '100%');
            animate.setAttribute('to', y + '%');
            animate.setAttribute('dur', animateDuration);
            rect.appendChild(animate);
          }

          svgElem.append(rect);
        }

        elem.append(svgElem);
      };

      var getArray = function(newVal) {
        var array = newVal;

        if (dictMode) {
          array = newVal.map(function(obj) {
            return obj[scope.objectKey];
          });
        }

        return array;
      };

      var chartHeight = (attrs.chartHeight) ? attrs.chartHeight : 90;
      var chartWidth = (attrs.chartWidth) ? attrs.chartWidth : 400;
      var chartColor = (attrs.chartColor) ? attrs.chartColor : '#000';

      scope.$watch('ngModel', function(newVal) {
        drawChart(getArray(newVal));
      }, dictMode);
    }
  };
});
