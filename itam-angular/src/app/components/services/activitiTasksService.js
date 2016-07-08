(function(){
    'use strict';
    angular.module('app')
            .service('tasksService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl','$localStorage','$timeout',
            tasksService
    ]);
    function tasksService ($resource, $http, Base64, $q, ServerUrl, $localStorage, $timeout) {
      var credentials = $localStorage.getObject('auth');
      return {
        all:function(teacherId){
          var request =  $resource(ServerUrl + "/activiti-rest/service/runtime/tasks",null,{
            get:{
              method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                }
            }
          });
         return request.get({assignee:teacherId});
            
          
        },
        variables:function(taskId){
          return $resource(ServerUrl + "/activiti-rest/service/runtime/tasks/:id/variables",null,{
            query:{
              method: 'GET',
              isArray: true,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                }
            }
          })
          .query({id:taskId});
          return data;
        },
        release:function(taskId,newTask){
          //console.log("Releasing the task " + taskId);
          //console.log("With the values: ");
          newTask = JSON.stringify(newTask);
          function onSuccess(){
            return $q.resolve("Yeah");
          }
          function onError(){
            return $q.reject("Noo");
          }
          $resource(ServerUrl + "/activiti-rest/service/runtime/tasks/:taskId",null,{
            save:{
              method: 'POST',
              isArray: true,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                }
            }
          })
          .save({taskId:taskId},newTask);

        }
      }
      return $resource(ServerUrl + "/activiti-rest/service/runtime/tasks");
    }
  })();