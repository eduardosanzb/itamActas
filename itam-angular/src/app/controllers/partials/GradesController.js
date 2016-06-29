(function () {
    angular
        .module('app')
        .controller('GradesController', 
            [ '$scope',
            GradesController
        ]);

    function GradesController($scope) {
        var vm = this;
        

      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data = [300, 500, 100];
      $scope.colors = ['#096729', '#096729', '#096729'];

      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    },
    title: {
        display: true,
        text: 'Custom Chart Title'
    }
  };



       
        
    }
})();
