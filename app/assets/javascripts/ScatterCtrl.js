/* global angular, d3 */

(function() {
  "use strict";

  angular.module("app").controller("scatterCtrl", function($scope, $http) {
    
    $scope.setup = function() {
      $scope.scatterOpeningAnimation();
      // d3.json("/api/nd.json", scatter);
    };

    // $scope.yearSliderFloor;
    // $scope.yearSliderCeil;

    $scope.scatterOpeningAnimation = function() {

      var years = [];
      for (var i = 1951; i <= 2015; i++) {
        years.push(i);
      }

      var yearIndex = 0;

      var year_interval = setInterval(function() {
        var startYear = function() {
          return years[yearIndex].toString() + "-12-12";
        };
        console.log("startYear: ", startYear());
        var endYear = function() {
          return (years[yearIndex] + 1).toString() + "-12-12";
        };
        console.log("endYear: ", endYear());

        var params = {};
        params = {"start_year": startYear(), "end_year": endYear()};
        $http.post("/api/nd/animation", params).then(function(response) {
          scatter(response.data);
        }, function(errors) {
        });
        yearIndex++;
        if (yearIndex > years.length) {
        // if (yearIndex === 5) {
          clearInterval(year_interval);
        }
      }, 1000);
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

    $scope.operatorNameSlider = {
      minValue: 200,
      maxValue: 2300,
      options: {
        floor: 1,
        ceil: 2500,
        draggableRange: true
      }
    };

    $scope.yearSlider = {
      minValue: 1940,
      maxValue: 2016,
      options: {
        floor: 1940,
        ceil: 2016,
        step: 1,
        draggableRange: true

      }
    };

    $scope.greaterThan = function(minWellCount) {
      return function(operator) {
        if (operator.wellCount >= minWellCount) { return true };
      };
    };

    $scope.lessThan = function(maxWellCount) {
      return function(operator) {
        if (operator.wellCount < maxWellCount) { return true };
      };
    };

    var getNewWells = function() {
      var params = {};
      params.operatorList = $scope.completeOperatorList;
      $http.post("/api/nd", params).then(function(response) {
        scatter(response.data);
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

    
    window.$scope = $scope;
  });
})();