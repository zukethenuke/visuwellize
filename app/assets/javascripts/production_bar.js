/* global d3 */

function proBar(well) {
  var operatorColor = well.color;
  d3.json("/api/nd/" + well.id, function(well) {

    d3.selectAll(".bar_graph").remove();

    var margin = {top: 20, right:20, bottom: 150, left: 62};
    var width = 960 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    var fixDate = function(well) {
      var format = d3.time.format("%Y-%m-%d");
      well.monthlys.forEach(function(d) {
        d.date = format.parse(d.date);
      });
    };
    fixDate(well);

    var xExtent = d3.extent(well.monthlys, function(d) { return d.date; });
    var yExtent = d3.extent(well.monthlys, function(d) { return d.bbls_oil; });

    var xScale = d3.time.scale()
      .range([0, width])
      .domain(xExtent);

    var yScale = d3.scale.linear()
      .range([height, 0])
      .domain(yExtent);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    var svg = d3.select("#production_bar")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
      .attr("class", "bar_graph");

    svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width / 2)
      .attr("y", 50)
      .style("text-anchor", "middle")
      .text("Bbls of Oil Per Month Over Life of the Well");

    svg.append("g")
      .attr("class", "yAxis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Oil (bbls)");

    var rects = svg.selectAll("rect")
      .data(well.monthlys);
      
    rects
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.date); })
      .attr("width", 2)
      .attr("y", function(d) { return yScale(d.bbls_oil); })
      .attr("height", function(d) { return height - yScale(d.bbls_oil); })
      .style("fill", operatorColor);
  });
}