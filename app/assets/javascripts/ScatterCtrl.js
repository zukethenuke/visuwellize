/* global angular, d3 */

(function() {
  "use strict";

  angular.module("app").controller("scatterCtrl",["$scope", "$http", function($scope, $http) {
    
    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 7,
      minZoom: 7,
      center: {lat: 47.3061, lng: -102.2043}
    });
    var mapMarkers = [];

    $scope.setup = function() {
      $scope.scatterOpeningAnimation();
    };

    $scope.scatterOpeningAnimation = function() {

      var isPaused = false;

      $('.pause').on('click', function(e) {
        isPaused = true;
        console.log(isPaused);
      });

      $('.play').on('click', function(e) {
        isPaused = false;
        console.log(isPaused);
      });

      var years = [];
      var yearIndex = 0;
      for (var i = 1951; i <= 2014; i++) {
        years.push(i);
      }

      var year_interval = setInterval(function() {
        var startYear = function() {
          return years[yearIndex].toString() + "-12-12";
        };
        var endYear = function() {
          return (years[yearIndex] + 1).toString() + "-12-12";
        };
        var params = {};
        console.log("isPaused: ",isPaused);
        if(!isPaused) {
          // yearlyTotalBar(yearIndex);
          params = {"start_year": startYear(), "end_year": endYear()};
          $http.post("/api/nd/animation", params).then(function(response) {
            scatter(response.data, map, mapMarkers);
          }, function(errors) {
          });
          if (yearIndex === 0) {
            isPaused = true; //pause after readme modal opens
          }
          if (years[yearIndex] < 2000) {
            yearIndex += 5;
          }else {
            yearIndex++;
          }
        }
        if (yearIndex >= years.length) {
        // if (yearIndex > 40) {
          clearInterval(year_interval);
        }
      }, 2500, isPaused);
    };

    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '4%', // Starting top style attribute
        ending_top: '10%' // Ending top style attribute
        // complete: function() {
        //   isPaused = false;
        // }
      });
      $('#readMe').openModal();
    });

   
    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      // ready: function() { alert('Ready'); }, // Callback for Modal open
      complete: function() { getNewWells(); } // Callback for Modal close
    });

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
      minValue: 1960,
      maxValue: 2016,
      options: {
        floor: 1950,
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
        scatter(response.data, map, mapMarkers);
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
  }]);
})();