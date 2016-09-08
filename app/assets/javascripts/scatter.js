var scatter = function(wells, map, mapMarkers) {

  var margin = {top: 20, right:20, bottom: 100, left: 62};
  var width = 960 - margin.left - margin.right;
  var height = 450 - margin.top - margin.bottom;

  var svg = d3.select("#scatter")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  svg.append("g")
    .attr("class", "xAxis");

  svg.append("g")
    .attr("class", "yAxis");

  svg.append("g")
    .attr("class", "chart");


  var update = function(wells) {
    d3.selectAll('.tooltip').remove();

    var fixDate = function(data) {
      var format = d3.time.format("%Y-%m-%d");
      data.sort(function(a,b) { // sort so largest wells display first and on bottom
        return b.cumOil - a.cumOil;
      });
      data.forEach(function(d) {
        if (d.spudDate) {
          d.spudDate = format.parse(d.spudDate);
        }
      });
    };
    fixDate(wells);

    var assignColorToWellByCompany = function(wells) {
      var companyArray = [];
      var companyColorArray = [];
      for (var i = 0; i < wells.length; i++) {
        if (companyArray.indexOf(wells[i].operator) === -1) {
          companyArray.push(wells[i].operator);
          if (wells[i].operator === "CONTINENTAL RESOURCES, INC.") {
            companyColorArray.push([{company: wells[i].operator}, {color: "blue"}]);
            continue;
          }else if (wells[i].operator === "HESS BAKKEN INVESTMENTS II, LLC") {
            companyColorArray.push([{company: wells[i].operator}, {color: "red"}]);
            continue;
          }else if (wells[i].operator === "WHITING OIL AND GAS CORPORATION") {
            companyColorArray.push([{company: wells[i].operator}, {color: "purple"}]);
            continue;
          }else if (wells[i].operator === "XTO ENERGY INC.") {
            companyColorArray.push([{company: wells[i].operator}, {color: "yellow"}]);
            continue;
          }else if (wells[i].operator === "EOG RESOURCES, INC.") {
            companyColorArray.push([{company: wells[i].operator}, {color: "green"}]);
            continue;
          }else if (wells[i].operator === "OASIS PETROLEUM NORTH AMERICA LLC") {
            companyColorArray.push([{company: wells[i].operator}, {color: "orange"}]);
            continue;
          }else if (wells[i].operator === "BURLINGTON RESOURCES OIL & GAS COMPANY") {
            companyColorArray.push([{company: wells[i].operator}, {color: "grey"}]);
            continue;
          }else if (wells[i].operator === "STATOIL OIL & GAS LP") {
            companyColorArray.push([{company: wells[i].operator}, {color: "brown"}]);
            continue;
          }else if (wells[i].operator === "AMERADA HESS CORPORATION") {
            companyColorArray.push([{company: wells[i].operator}, {color: "steelblue"}]);
            continue;
          }else if (wells[i].operator === "DENBURY ONSHORE, LLC") {
            companyColorArray.push([{company: wells[i].operator}, {color: "lightgrey"}]);
            continue;
          }else {
          companyColorArray.push([{company: wells[i].operator}, {color: randomColor()}]);
          }
        }
      }
      wells.forEach(function(well) {
        companyColorArray.forEach(function(d) {
          if (well.operator === d[0].company) {
            well.color = d[1].color;
          }
        });
      });
    };
    assignColorToWellByCompany(wells);

    // googleMapAScatter(wells, map, mapMarkers);
    yearlyTotalBar();

    var toolTip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var formatComma = d3.format(",");

    var xExtent = d3.extent(wells, function(well) { return well.spudDate; });
    // var yExtent = d3.extent(wells, function(well) { return well.td; });
    var yExtent = d3.extent([0, 26000]);

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

    var xg = d3.select('.xAxis')
      .attr("transform", "translate(0," + height + ")")
      // .transition()
      .call(xAxis);

    var yg = d3.select('.yAxis')
      // .transition()
      .call(yAxis);

    d3.select('.xAxis')
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Spud Date");

    d3.select('.yAxis')
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Depth (ft)");

    var circles = d3.select('.chart').selectAll("circle")
      .data(wells);

    circles.enter()
      .append("circle");
      
    circles.transition()
      .duration(1000)
      .attr("class", function(d) { return d.operator; })
      .attr("cx", function(d) { return xScale(d.spudDate); })
      .attr("cy", function(d) { return yScale(d.td) })
      .attr("r", function(d) { return Math.sqrt(d.cumOil) / 30 })
      .style("opacity", .5)
      .style("fill", function(d) { return d.color; });

    circles.exit().remove();

    circles.on("mouseover", function(d) {
      d3.select(this)
        .style("stroke", "black")
        .style("stroke-width", 3);
      toolTip.transition()
        .duration(200)
        .style("opacity", .9);
      toolTip.html(d.operator + "<br> Depth: " + d.td + " feet<br>Total Oil Output: " + formatComma(d.cumOil) + " bbls")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) - 85 + "px");
      proBar(d);
    });

    circles.on("mouseout", function(d) {
      d3.select(this)
        .style("stroke", "")
        .style("stroke-width", 1);
      d3.select('.tooltip')
        .transition()
        .duration(500)
        .style("opacity", 0);
    });

    d3.select('svg')
    .on('click', function() {
      d3.json("/api/nd.json", update);
    });
  };

  update(wells);
};

