/* global angular, d3 */

(function() {
  "use strict";

  angular.module("app").controller("scatterCtrl", function($scope, $http) {
    
    $scope.setup = function() {
      d3.json("/api/nd.json", $scope.scatter);
    };

    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      // ready: function() { alert('Ready'); }, // Callback for Modal open
      complete: function() { getNewWells() } // Callback for Modal close
      }
    );

    var getNewWells = function() {
      var params = {};
      params.operatorList = $scope.completeOperatorList;
      $http.post("/api/nd", params).then(function(response) {
        $scope.scatter(response.data);
      }, function(errors) {

      });
    };

    var getCompleteOperatorList = function() {
      $http.get('/api/nd/operators.json').then(function(response) {
        $scope.completeOperatorList = response.data;
        $scope.completeOperatorList.forEach(function(operator) {
          operator.checked = false;
        });
        $scope.completeOperatorList.sort(function(a,b) {
          return a.id - b.id;
        });
      });
    };

    getCompleteOperatorList();

    $scope.setOrderAttribute = function(inputAttribute) {
      if ($scope.orderAttribute !== inputAttribute) { // clicked on a different button
        $scope.isOrderDescending = false;
      }else { // clicked on the same button
        $scope.isOrderDescending = !$scope.isOrderDescending;
      }
      $scope.orderAttribute = inputAttribute;
    };

    $scope.scatter = function(wells) {

      d3.selectAll('g').remove();
      d3.selectAll('circle').remove();
      d3.selectAll('.tooltip').remove();

      var margin = {top: 20, right:20, bottom: 100, left: 62};
      var width = 960 - margin.left - margin.right;
      var height = 450 - margin.top - margin.bottom;
      
      var fixDate = function(data) {
        var format = d3.time.format("%Y-%m-%d");
        data.sort(function(a,b) { // sort so largest wells deiplay first and on bottom
          return b.cum_oil - a.cum_oil;
        });
        data.forEach(function(d) {
          if (d.spud_date) {
            d.spud_date = format.parse(d.spud_date);
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
            companyColorArray.push([{company: wells[i].operator}, {color: randomColor()}]);
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

      var toolTip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var formatComma = d3.format(",");

      var xExtent = d3.extent(wells, function(well) { return well.spud_date; });
      var yExtent = d3.extent(wells, function(well) { return well.depth; });

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

      var svg = d3.select("#scatter")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Spud Date");

      svg.append("g")
        .attr("class", "axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Depth (ft)");

      svg.selectAll("circle")
        .data(wells)
        .enter()
      .append("circle")
        .attr("class", function(d) { return d.operator; })
        .attr("cx", function(d) { return xScale(d.spud_date); })
        .attr("cy", function(d) { return yScale(d.depth) })
        .attr("r", function(d) { return d.cum_oil / 40000 })
        .style("opacity", .5)
        .style("fill", function(d) { return d.color; })
        .on("mouseover", function(d) {
          d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 3);
          toolTip.transition()
            .duration(200)
            .style("opacity", .9);
          toolTip.html(d.operator + "<br> Depth: " + d.depth + " feet<br>Total Oil Output: " + formatComma(d.cum_oil) + " bbls")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) - 85 + "px");
          proBar(d);
        })
        .on("mouseout", function(d) {
          d3.select(this).style("stroke", "");
          d3.select('.tooltip')
            .transition()
            .duration(500)
            .style("opacity", 0);
        });

      d3.select('svg')
      .on('click', function() {
        d3.json("/api/nd.json", function(newWells) {
          fixDate(newWells);
          assignColorToWellByCompany(newWells);

          svg.selectAll('circle')
            .data(newWells)
            .transition()
            .duration(1000)
            .attr("class", function(d) { return d.operator; })
            .attr("cx", function(d) { return xScale(d.spud_date); })
            .attr("cy", function(d) { return yScale(d.depth); })
            .attr("r", function(d) { return d.cum_oil / 40142; })
            .style("fill", function(d) { return d.color; });
        });
      });
    };
    window.$scope = $scope;
  });
})();