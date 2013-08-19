var app = angular.module('async-call', []);

app.controller('MainCtrl', function($scope, myService) {
  $scope.items = myService.getItems();
  $scope.nestedItems = myService.getNestedData();
  $scope.betterNested = myService.getNestedDataBetter();
});

app.factory('myService', function ($http, $q){
  return {
    getItems: function (){
      //$q.all will wait for an array of promises to resolve,
      // then will resolve it's own promise (which it returns)
      // with an array of results in the same order.
      return $q.all([
          $http.get('items_part_1.json'),
          $http.get('items_part_2.json')
        ])
        
        //process all of the results from the two promises 
        // above, and join them together into a single result.
        // since then() returns a promise that resolves ot the
        // return value of it's callback, this is all we need 
        // to return from our service method.
        .then(function(results) {
          var data = [];
          angular.forEach(results, function(result) {
            data = data.concat(result.data);
          });
          return data;
        });
    },
    getNestedData: function (){ 
      // get the parents.
      return $http.get('parents.json')
        .then(function(result) {          
          //return a promise to that data.
          return result.data;
        })
        //handle the promise to the parent data
        .then(function(parents) {         
          //get the children.
          return $http.get('children.json')
            //handle the promise to the children.
            .then(function(result) {            
              //add children to the appropriate parent(s).
              var children = result.data;
              angular.forEach(parents, function(parent) {
                parent.children = [];            
                angular.forEach(children, function(child) {
                  if(parent.childIds.indexOf(child.id) >= 0) {
                    parent.children.push(child);
                  }
                });
              });              
              //return the parents
              return parents;
            });
        });
    },
    
    //a different take on the nesting problem,
    //using $q directly.
    getNestedDataBetter: function (){
      //create your deferred promise.
      var deferred = $q.defer();
      
      //do your thing.
      $http.get('parents.json')
        .then(function(result){
          var parents = result.data;
          $http.get('children.json')
            .then(function(result) {
              var children = result.data;
                angular.forEach(parents, function(parent) {
                  parent.children = [];            
                  angular.forEach(children, function(child) {
                    if(parent.childIds.indexOf(child.id) >= 0) {
                      parent.children.push(child);
                    }
                  });
                }); 
                
                //at whatever point in your code, you feel your
                // code has loaded all necessary data and/or
                // resolve your promise.
                deferred.resolve(parents);
            });
        });
        
      //return your promise to the user.
      return deferred.promise;
    }
  };
});