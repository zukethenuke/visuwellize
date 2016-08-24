/* global angular, d3 */

(function() {
  "use strict";

  angular.module("app").controller("scatterCtrl", function($scope, $http) {
    
    $scope.setup = function() {
      d3.json("http://localhost:3000/api/nd.json", $scope.scatter);
    };

    // $scope.call = function() {
    //   params = {

    //   }
    //   $http.get("localhost:3000/api/nd", params).then(function(response) {
    //     var newData = response.data;
    //   }, function(errors) {

    //   })
    // };

    $scope.scatter = function(wells) {

      // var generateOperatorList = function(wells) {
      //   $scope.operatorsArray = [];
      //   wells.forEach(function(well) {
      //     if ($scope.operatorsArray.indexOf(well.operator) === -1) {
      //       $scope.operatorsArray.push(well.operator);
      //     }
      //   });
      //   convertOperatorListToObject();
      //   console.log($scope.operatorsArray);
      //   $scope.$apply();
      // };

      // var convertOperatorListToObject = function() {
      //   $scope.operatorsObject = {};
      //   $scope.operatorsArray.forEach(function(operator) {
      //     $scope.operatorsObject[operator] = false;
      //   });
      //   console.log($scope.operatorsObject);
      // };

      // generateOperatorList(wells);

      var checkedOperatorGetList = function() {

      };

      var getCompleteOperatorList = function() {
        $http.get('http://localhost:3000/api/nd/operators.json').then(function(response) {
          $scope.completeOperatorList = response.data;
          $scope.completeOperatorList.forEach(function(operator) {
            operator.checked = false;
          });
          console.log('all ops', $scope.completeOperatorList);
        });
      };

      getCompleteOperatorList();
      
      $scope.selectedOperators = [];

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
        .on("mouseover", function(d) {
          console.log(d);
          d3.select(this).style("fill", "purple");
          proBar(d);
        })
        .on("mouseout", function(d) {
          d3.select(this).style("fill", "");
        });


      d3.select('svg')
      .on('click', function() {
        // d3.json("http://localhost:3000/api/nd.json", scatter)
        d3.json("http://localhost:3000/api/nd.json", function(newWells) {
          fixDate(newWells);
          generateOperatorList(newWells);

          svg.selectAll('circle')
            .data(newWells)
            .transition()
            .duration(1000)
            // .delay(function(d,i) { return i / 20; })
            .attr("class", function(d) { return d.operator; })
            .attr("cx", function(d) { return xScale(d.spud_date); })
            .attr("cy", function(d) { return yScale(d.depth); })
            .attr("r", function(d) { return d.cum_oil / 40142; });
          //            .style("fill", '#00FF00');
        
        });
      });

    };

    // $scope.$apply();

    window.$scope = $scope;

  });
  // $scope.$apply();
})();