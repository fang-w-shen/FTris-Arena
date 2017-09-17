(function() {
  'use strict';

  var FirebaseFactory = function($q, $http, $rootScope,firebaseInfo) {
    let lowestHighScore;
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
      },
      postNewHighScore: function(score){
        return $q((resolve, reject) => {
          let newObj = JSON.stringify(score);
          $http.patch(`${firebaseInfo.databaseURL}/highscores/${id}.json`, newObj)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
        });
      },
      setLowestHighScore: function(score){
        lowestHighScore = score;
      },
      getLowestHighScore: function(){
        return lowestHighScore;
      }
    };
  };

  FirebaseFactory.$inject = ['$q','$http', '$rootScope','firebaseInfo'];
  angular.module('TetrisApp').factory('FirebaseFactory', FirebaseFactory);
})();
