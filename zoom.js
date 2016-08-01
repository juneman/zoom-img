'use strict';

angular.module('scHelper').factory('Zoom', function(Rect) {
  function Zoom() {
    var active = this.active = new Rect();
    var activeView = this.activeView = new Rect();
    var passive = this.passive = new Rect();
    var passiveView = this.passiveView = new Rect();
    // �������ߵ���Գߴ磬��active�е�����ӳ�䵽passive�е�����
    var update = this.update = function() {
      var ratioX = passive.width / active.width;
      var ratioY = passive.height / active.height;
      passive.moveTo(-activeView.x * ratioX, -activeView.y * ratioY);
    };
    this.resize = function() {
      activeView.limitTo({left: 0, top: 0, right: active.width, bottom: active.height});
      var ratioX = passive.width / active.width;
      var ratioY = passive.height / active.height;
      activeView.resize(passiveView.width / ratioX, passiveView.height / ratioY);
      update();
    };
    passiveView.onResize = active.onResize = passive.onResize = this.resize;
    activeView.onResize = activeView.onMove = this.update;
  }
  return Zoom;
});
