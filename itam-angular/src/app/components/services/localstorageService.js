(function(){
  'use strict';

  angular.module('app')
          .service('$localStorage', [
          '$window','Base64',
          $localStorage
  ]);

  function $localStorage($window, Base64){
    return {
        set: function(key, value) {
            var theValue = Base64.encode(value);
            $window.localStorage[key] = theValue;
        },
        get: function(key, defaultValue) {
            return Base64.decode($window.localStorage[key]) || defaultValue;
        },
        setObject: function(key, value) {
          var object = JSON.stringify(value);
            $window.localStorage[key] = Base64.encode(object);
        },
        getObject: function(key) {
          var object = Base64.decode($window.localStorage[key]);
            return JSON.parse(object || 'null');
        }
    }
    
  }

})();
