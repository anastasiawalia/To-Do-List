(function(){
console.log("in")
angular.module("To-Do-List", ["firebase"]);
var app = angular.module("To-Do-List", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseObject) {
    var ref = new Firebase("https://to-do-list-8c154.firebaseio.com/data");
    
//  // create an instance of the authentication service
//  var auth = $firebaseAuth(ref);
//  
//  // login with Facebook
//  auth.$authWithOAuthPopup("facebook").then(function(authData) {
//    console.log("Logged in as:", authData.uid);
//  }).catch(function(error) {
//    console.log("Authentication failed:", error);
//  });
    
  // download the data into a local object
    var syncObject = $firebaseObject(ref);
    console.log(syncObject)

  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data");
});
    
})()

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "partials/state1.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});
