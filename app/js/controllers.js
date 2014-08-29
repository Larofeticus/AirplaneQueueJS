var AirplaneQueue = angular.module('AirplaneQueue', []);

AirplaneQueue.controller(
  'AQcontroller',
  [
    '$scope',
    function ($scope)
    {
      //set up the queue       
      var queue = 
      {
        'passengerlarge': [],
        'passengersmall': [],
        'cargolarge': [],
        'cargosmall': [],
      };
      //keep an ordered list of keys to check when dequeing
      var order = 
      [  
        'passengerlarge',
        'passengersmall',
        'cargolarge',
        'cargosmall',
      ];

      //set defaults for UI forms
      $scope.airplaneType = 'passenger';
      $scope.airplaneSize = 'large';
      $scope.message = '';

      $scope.enqueueAirplane = function()
      {
        if(!$scope.airplaneName)
        {
          $scope.message = "Must enter an airplane name.";
          return;
        }
        var airplane = buildAirplane($scope.airplaneName, $scope.airplaneType, $scope.airplaneSize);
        queue[airplane.key].push(angular.copy(airplane));
        $scope.airplaneName = '';
        $scope.message = "Placed airplane into queue.";
      }

      $scope.dequeueAirplane = function()
      {
        var i = 0, orderLength = order.length;
        
        for(i = 0; i < orderLength; i+=1)
        {
          if(queue[order[i]].length)
          {
            var airplane = queue[order[i]].shift();
            $scope.message = 'Dequeued airplane named ' + airplane['id'] + ' which is a ' + airplane['size'] + ' ' + airplane['type'] + ' plane.';
            return;
          }
        }

        $scope.message = 'No airplanes to dequeue.';
      }

      var buildAirplane = function BuildAirplane(name, type, size)
      {
        return {
          'id': name,
          'type': type,
          'size': size,
          'key': type+size  
        };
      }
    }
  ]
);
