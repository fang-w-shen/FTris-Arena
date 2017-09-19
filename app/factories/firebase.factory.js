(function() {
  'use strict';

  var FirebaseFactory = function($q, $http, $rootScope,firebaseInfo) {
    var lowestHighScore = '';
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
      getLowestHighScore: function(){


        let scores;
        return $q( (resolve, reject) => {
          $http.get(`${firebaseInfo.databaseURL}/highscores.json`)
          .then((itemObject) => {
            scores = (itemObject.data);

            let keys = Object.keys(scores);
            let values = Object.values(scores);

            values.sort((a,b)=>{

              if (a.score < b.score){
                return 1;
              }
              if (a.score > b.score){
                return -1;
              }
              return 0;
            });
            values = values.splice(0,3);
            lowestHighScore = values[2].score;
            console.log("lowestHighScore", lowestHighScore);

            resolve(lowestHighScore);
          })
          .catch((error) => {
            reject(error);
          });
        });




      },
      getGameBoards: function(){
        let boards;
        return $q( (resolve, reject) => {
          $http.get(`${firebaseInfo.databaseURL}/games.json`)
          .then((itemObject) => {
            boards = (itemObject.data);
            resolve(boards);
          })
          .catch((error) => {
            reject(error);
          });
        });
      },
    };
  };

  FirebaseFactory.$inject = ['$q','$http', '$rootScope','firebaseInfo'];
  angular.module('TetrisApp').factory('FirebaseFactory', FirebaseFactory);
})();
