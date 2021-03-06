var yearlyTotalBar = function(yearIndex) {
  // d3.selectAll(".totalBar").remove();

  var yearsTotalArray = [
    {"year": 1951, "total": 26196},
    {"year": 1952, "total": 1603555},
    {"year": 1953, "total": 5275831},
    {"year": 1954, "total": 6024947},
    {"year": 1955, "total": 11183607},
    {"year": 1956, "total": 12755580},
    {"year": 1957, "total": 13210633},
    {"year": 1958, "total": 14272060},
    {"year": 1959, "total": 17869422},
    {"year": 1960, "total": 21993603},
    {"year": 1961, "total": 23676981},
    {"year": 1962, "total": 25176013},
    {"year": 1963, "total": 25026862},
    {"year": 1964, "total": 25725429},
    {"year": 1965, "total": 26344307},
    {"year": 1966, "total": 27122483},
    {"year": 1967, "total": 25313448},
    {"year": 1968, "total": 25038753},
    {"year": 1969, "total": 22706378},
    {"year": 1970, "total": 22006300},
    {"year": 1971, "total": 21653912},
    {"year": 1972, "total": 20624158},
    {"year": 1973, "total": 20233812},
    {"year": 1974, "total": 19658695},
    {"year": 1975, "total": 20452740},
    {"year": 1976, "total": 21725878},
    {"year": 1977, "total": 23272804},
    {"year": 1978, "total": 24811728},
    {"year": 1979, "total": 30925913},
    {"year": 1980, "total": 40446550},
    {"year": 1981, "total": 45907342},
    {"year": 1982, "total": 47538921},
    {"year": 1983, "total": 50723673},
    {"year": 1984, "total": 52658368},
    {"year": 1985, "total": 50945412},
    {"year": 1986, "total": 45656861},
    {"year": 1987, "total": 41363032},
    {"year": 1988, "total": 39363927},
    {"year": 1989, "total": 36746439},
    {"year": 1990, "total": 36723443},
    {"year": 1991, "total": 35899235},
    {"year": 1992, "total": 32902721},
    {"year": 1993, "total": 30925059},
    {"year": 1994, "total": 27693359},
    {"year": 1995, "total": 29335094},
    {"year": 1996, "total": 32299904},
    {"year": 1997, "total": 35837096},
    {"year": 1998, "total": 35564024},
    {"year": 1999, "total": 32878573},
    {"year": 2000, "total": 32712529},
    {"year": 2001, "total": 31693576},
    {"year": 2002, "total": 30803091},
    {"year": 2003, "total": 29410706},
    {"year": 2004, "total": 31152247},
    {"year": 2005, "total": 35675194},
    {"year": 2006, "total": 39929639},
    {"year": 2007, "total": 45145584},
    {"year": 2008, "total": 62761277},
    {"year": 2009, "total": 79792934},
    {"year": 2010, "total": 113041670},
    {"year": 2011, "total": 153028308},
    {"year": 2012, "total": 243297241},
    {"year": 2013, "total": 313845031},
    {"year": 2014, "total": 397015995},
    {"year": 2015, "total": 432286156}
  ];
  var data = yearsTotalArray[yearIndex];
  data.total = +data.total;
  console.log("Yearly Total: ", data.year, data.total);

  var margin = {top: 20, right:20, bottom: 150, left: 62};
  var width = 300 - margin.left - margin.right;
  var height = 450 - margin.top - margin.bottom;

  var xScale = d3.scale.ordinal()
    .rangeBands([0, width])
    .domain(data.map( function(d){ return d.year; }));

  var yScale = d3.scale.linear()
    .range([height, 0])
    .domain([0,500000000]);

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    .tickSize(20)
    .outerTickSize(0); // Turn off the marks at the end of the axis.
  var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(5) // Use approximately 5 ticks marks.
    .tickSize(20);


  var svg = d3.select("#yearly_total")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    .attr("class", "totalBar");

  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width / 2)
    .attr("y", 50)
    .style("text-anchor", "middle")
    .text("Year");

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
    .data(yearsTotalArray[yearIndex]);

  rects
    .enter()
    .append("rect")
    .attr("class", "bar")
    // .attr("x", xScale(yearsTotalArray[yearIndex]["year"]))
    .attr("width", 20)
    .attr("y", yScale(yearsTotalArray[yearIndex]["year"]))
    .attr("height", yScale(yearsTotalArray[yearIndex]["year"]));
};