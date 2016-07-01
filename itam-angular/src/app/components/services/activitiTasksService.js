(function(){
    'use strict';
    angular.module('app')
            .service('tasksService', [ 
            '$resource','$http','Base64', '$q',
            tasksService
    ]);
    function tasksService ($resource, $http, Base64, $q) {
      return {
        all:function(teacherId){
          $http.defaults.headers.common[{"Authorization" : "Basic " + Base64.encode("admin:admin")}];
          return $resource("http://cloud.lucasianmexico.com:8585/activiti-rest/service/runtime/tasks",null,{
            get:{
              method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + Base64.encode("admin:admin")
                }
            }
          })
          .get({assignee:teacherId});
          
        },
        variables:function(taskId){
          $http.defaults.headers.common[{"Authorization" : "Basic " + Base64.encode("admin:admin")}];
          return $resource("http://cloud.lucasianmexico.com:8585/activiti-rest/service/runtime/tasks/:id/variables",null,{
            query:{
              method: 'GET',
              isArray: true,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode("admin:admin")
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
          //console.log(newTask);
          function onSuccess(){
            return $q.resolve("Yeah");
          }
          function onError(){
            return $q.reject("Noo");
          }
          $http.defaults.headers.common[{"Authorization" : "Basic " + Base64.encode("admin:admin")}];
          $resource("http://cloud.lucasianmexico.com:8585/activiti-rest/service/runtime/tasks/:taskId",null,{
            save:{
              method: 'POST',
              isArray: true,
                headers: {
                    'Authorization': 'Basic ' + Base64.encode("admin:admin")
                }
            }
          })
          .save({taskId:taskId},newTask);

        }
      }
      return $resource("http://cloud.lucasianmexico.com:8585/activiti-rest/service/runtime/tasks");
    }
  })();