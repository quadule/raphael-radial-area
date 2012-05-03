Raphael.fn.radialArea = (data=[], options={}) ->
  width  = options.width    || @width
  height = options.height   || @height
  cx     = options.center_x || width / 2
  cy     = options.center_y || height / 2
  radius = options.radius   || Math.min(width, height) / 2
  
  radians = Math.PI / 180
  sectorDegrees = 360 / data.length
  chart = @set()
  
  sector = (index, radius, params) =>
    startAngle = index * sectorDegrees
    endAngle = startAngle + sectorDegrees
    x1 = cx + radius * Math.cos(-startAngle * radians)
    x2 = cx + radius * Math.cos(-endAngle   * radians)
    y1 = cy + radius * Math.sin(-startAngle * radians)
    y2 = cy + radius * Math.sin(-endAngle   * radians)
    @path(["M", cx, cy, "L", x1, y1, "A", radius, radius, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params)
  
  for params, i in data
    length = radius * Math.sqrt(params.value)
    chart.push sector i, length, params
  
  chart
