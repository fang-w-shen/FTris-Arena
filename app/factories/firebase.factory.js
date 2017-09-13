(function() {
  'use strict';

  var FirebaseFactory = function($q, $http, $rootScope,firebaseInfo) {
    return {
      getHighScores: function(){
        let scores;
        return $q( (resolve, reject) => {
            $http.get(`${firebaseInfo.databaseURL}/highscores.json`)
            .then((itemObject) => {
                scores = (itemObject.data);
                resolve(scores);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
  };
};

  FirebaseFactory.$inject = ['$q','$http', '$rootScope','firebaseInfo'];
  angular.module('TetrisApp').factory('FirebaseFactory', FirebaseFactory);
})();
