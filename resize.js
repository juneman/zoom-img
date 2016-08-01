'use strict';

/**
 * ȡ����Ԫ�صĴ�С
 */
angular.module('scHelper').directive('scResize', function($parse, $interval) {
  return {
    restrict: 'A',
    compile: function($element, attr) {
      var fn = $parse(attr['scResize']);
      return function(scope, element, attr) {
        var lastWidth = -1;
        var lastHeight = -1;
        // ��ʱ����ߣ�����仯�ˣ��ʹ����ص������ﲻ��$interval������Ϊ�����ڼ��ʱ����$apply����Ӧ�����б仯ʱ�Ŵ���
        // ���õ��Ķ�ʱ����㷨��Ч�����⣬ȡ��ߵĺ������кܿ죬��chrome�в��ԵĽ����1�����ڿ���ִ��10��
        var id = setInterval(function() {
          var width = element.width();
          var height = element.height();
          if (width !== lastWidth || height !== lastHeight) {
            lastWidth = width;
            lastHeight = height;
            scope.$apply(function() {
              fn(scope, {width: width, height: height})
            });
          }
        }, 300);
        scope.$on('destroy', function() {
          clearInterval(id);
        });
      };
    }
  }
});
