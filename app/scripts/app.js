(function() {
     function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
         });
         $stateProvider
         
             .state('all', {
                 url: '/all',
                 controller: 'AllCtrl as all',
                 templateUrl: '/app/templates/all.html'
             })
             .state('active', {
                 url: '/active',
                 controller: 'ActiveCtrl as active',
                 templateUrl: '/app/templates/active.html'
             })
             .state('completed', {
                 url: '/completed',
                 controller: 'CompletedCtrl as completed',
                 templateUrl: '/app/templates/completed.html'
         });
     }

     angular
         .module('blocItOff', ['ui.router', 'firebase'])
         .config(config);
})();

//Controllers

//active controller
(function() {
     function ActiveCtrl(Message) {         
         this.title = "Active Tasks";
         this.allMessages = Message.priority(); 
         this.Message = Message;     
     }
 
     angular
         .module('blocItOff')
         .controller('ActiveCtrl', ['Message', ActiveCtrl]); 
 })();

//all controller
(function() {
     function AllCtrl($firebaseArray, Message) {    
         this.title = "All Tasks";
         this.allMessages = Message.key();
         this.Message = Message; 
         this.getTextDeco = function(date, compl) {
             if ( Message.calcOverdue(Message.calcDueDate(date)) || compl) {
                 return 'line-through';  
             } else {
                 return 'none';  
             }
        };
              }
      angular
         .module('blocItOff')
         .controller('AllCtrl', AllCtrl); 
 })();

//complete controller
 (function() {
     function CompletedCtrl(Message) {      
         this.title = "Completed Tasks";
         this.allMessages = Message.value(); 
         this.Message = Message; 
         
     }
 
     angular
         .module('blocItOff')
         .controller('CompletedCtrl', ['Message', CompletedCtrl]); 
 })();

//main controller
 (function() {
     function MainCtrl($firebaseArray) { 
         var rootRef = new Firebase("https://to-do-list-8c154.firebaseio.com/");    
         var currentMessageRef = rootRef.child('currentMessage');
         var allMessagesRef = rootRef.child('allMessages'); 
         var lblCurrentMessage = document.getElementById('lblCurrentMessage'); 
         var txtNewMessage = document.getElementById('txtNewMessage'); 
         var btnUpdateMessage = document.getElementById('btnUpdateMessage'); 
         var btnUndo = document.getElementById('btnUndo');         
         var postID;
         var newPostRef;
         btnUpdateMessage.addEventListener('click', function(){
             console.log("UPDATE");
             if (document.getElementById('prLow').checked) {
                 var txtPriority = document.getElementById('prLow').value;
             } else if (document.getElementById('prHigh').checked) {
                 var txtPriority = document.getElementById('prHigh').value;
             } else {
                 var txtPriority = document.getElementById('prMed').value;
             }
             currentMessageRef.set(txtNewMessage.value);
             newPostRef = allMessagesRef.push();
             newPostRef.set({
                 value: txtNewMessage.value, 
                 priority: txtPriority, 
                 completed: false, 
                 dateAdded: Firebase.ServerValue.TIMESTAMP 
             });
             postID = newPostRef.key();
             txtNewMessage.value = '';
             updateUI();
         });
         
         btnUndo.addEventListener('click', function(){
             console.log("UNDO");
             var lastMessage = allMessagesRef.child(newPostRef.key());
             lastMessage.remove();
             currentMessageRef.set(''); 
             updateUI();
         });

    var updateUI = function(){ 
     };
 
     angular
         .module('blocItOff')
         .controller('MainCtrl', MainCtrl); 
 }();

//filter
(function() {
     function priority() {

         return function(code) {
             code = Number(code); 
             switch(code){
                case 1:
                    return 'high';
                    break;
                case 2: 
                    return 'medium';
                    break;
                case 3: 
                    return 'low';
                    break;
                default: 
                    return 'other';
            }
         };
     }
 
     angular
         .module('blocItOff')
         .filter('priority', priority);
 })();   
     
//services
(function() {
    function Message($firebaseArray) {
        var rootRef = new Firebase("https://to-do-list-8c154.firebaseio.com/");
        var allMessagesRef = rootRef.child('allMessages');
    }
}
        var Messages =  {
            key: function() {
                return $firebaseArray(allMessagesRef); 
            },
            priority: function() {
                return $firebaseArray(allMessagesRef.orderByChild("priority"));
            },
            completed: function() {
                return $firebaseArray(allMessagesRef.orderByChild("completed"));             
            },
            value: function() {
                return $firebaseArray(allMessagesRef.orderByChild("value")); 
            }            
        };     
         Messages.calcDueDate = function(dateEntered){
             var dueDate = dateEntered + 6.048e+8; 
             return dueDate;
         };

         Messages.calcOverdue = function(dueDate){
             var difference = dueDate - new Date().getTime();
             if (difference > 0)
                 return false; 
             else
                 return true; 
         };

        Messages.checkOff = function(task){
            console.log('CHECK OFF', task.dateAdded, task.value, task.priority, task.completed);
            allMessagesRef.orderByChild("dateAdded").equalTo(task.dateAdded).on("child_added", function(snapshot) {
                console.log(snapshot.key());
                var curRef = allMessagesRef.child(  snapshot.key() );
                curRef.update({"completed": true});
                console.log('CHECK OFF', task.completed);
            });
        };
 
        return Messages;
    
    angular {
        .module('blocItOff')
        .factory('Message', Message);
})();
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
