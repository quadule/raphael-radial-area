(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Raphael.fn.radialArea = function(data, options) {
    var chart, cx, cy, height, i, length, params, radians, radius, sector, sectorDegrees, width, _len;
    if (data == null) {
      data = [];
    }
    if (options == null) {
      options = {};
    }
    width = options.width || this.width;
    height = options.height || this.height;
    cx = options.center_x || width / 2;
    cy = options.center_y || height / 2;
    radius = options.radius || Math.min(width, height) / 2;
    radians = Math.PI / 180;
    sectorDegrees = 360 / data.length;
    chart = this.set();
    sector = __bind(function(index, radius, params) {
      var endAngle, startAngle, x1, x2, y1, y2;
      startAngle = index * sectorDegrees;
      endAngle = startAngle + sectorDegrees;
      x1 = cx + radius * Math.cos(-startAngle * radians);
      x2 = cx + radius * Math.cos(-endAngle * radians);
      y1 = cy + radius * Math.sin(-startAngle * radians);
      y2 = cy + radius * Math.sin(-endAngle * radians);
      return this.path(["M", cx, cy, "L", x1, y1, "A", radius, radius, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }, this);
    for (i = 0, _len = data.length; i < _len; i++) {
      params = data[i];
      length = radius * Math.sqrt(params.value);
      chart.push(sector(i, length, params));
    }
    return chart;
  };
}).call(this);
