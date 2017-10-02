"use strict";
(function instantiateLiveTime(){
  var time = new Date();
  var day = time.getDate();
  var month = time.getMonth();
  var year = time.getFullYear();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var sec = time.getSeconds();
  var amORpm = getamORpm(hour);
  hour = getNonMilitaryTime(hour);
  minute = getTime(minute);
  sec = getTime(sec);
  var newTime = setTimeout(instantiateLiveTime, 1000);
  function getTime(i){
    if(i < 10){
      i ="0" +i;
    }
    return i;
  }
  function getNonMilitaryTime(i){
    if (i===0){
      i = 12;
    }
    else if(i > 12){
      i =i-12;
    }
    return i;
  }
  function getamORpm(i) {
    if (i<12){
      return ' AM';
    }
    else {
      return ' PM';
    }
  }
  $('#time').html(month+1+ "/" + day  + "/" + year + `<br>` + hour + ":" + minute + ":" + sec + amORpm);
})();

