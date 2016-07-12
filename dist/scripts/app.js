(function(){
console.log("in")
var app = angular.module("myApp", ['ui.router',"firebase"]);

// do stuff smallest amount of one step at time and test before moving on
// make a firebase todo list + button to create {todo: "string", completed: boolean, createdAt: timestamp, priority: integer}
// print the list to the DOM
// sort the list
// buttons to modify todo details
    


app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/templates/home.html"
    })
  
//  template/controller
  
  
//    .state('state1.list', {
//      url: "/list",
//      templateUrl: "partials/state1.list.html",
//      controller: function($scope) {
//        $scope.items = ["A", "List", "Of", "Items"];
//      }
//    })
//    .state('state2', {
//      url: "/state2",
//      templateUrl: "partials/state2.html"
//    })
//    .state('state2.list', {
//      url: "/list",
//      templateUrl: "partials/state2.list.html",
//      controller: function($scope) {
//        $scope.things = ["A", "Set", "Of", "Things"];
//      }
//    });
    });
    
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