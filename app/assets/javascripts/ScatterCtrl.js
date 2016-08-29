/* global angular, d3 */

(function() {
  "use strict";

  angular.module("app").controller("scatterCtrl", function($scope, $http) {
    
    $scope.setup = function() {
      d3.json("/api/nd.json", scatter);
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