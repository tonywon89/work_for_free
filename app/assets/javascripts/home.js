
//variables to set the counter
var seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0; 
var counterTime, freeTime = 0;

var startTime, stopTime, totalTime;

  
$(document).ready(function(){
  $.getScript("https://gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js", function(){
    //$('#work-toggle').bootstrapToggle();
    //$('#free-toggle').bootstrapToggle();
    $('#work-toggle').bootstrapToggle('disable');
    $('#free-toggle').bootstrapToggle('disable');
  });
    //starts the initial counter to be 0.
    updateCounter();
    updateFreeTime();

    var startButton = $('#start-button'), stopButton = $('#stop-button'), resetButton = $('#reset-button');
    var interval;
    disable(stopButton);
    

    //When this is clicked, the button is disabled, and the time starts.
    startButton.click(function(){
      interval = setInterval(function() {
        seconds += 1;
        if (seconds == 10) {
          seconds = 0;
          tenSeconds += 1;
          if (tenSeconds == 6) {
            tenSeconds = 0;
            minutes += 1;
            if (minutes == 10) {
              minutes = 0;
              tenMinutes += 1;
              if (tenMinutes == 6) {
                tenMinutes = 0;
                hours += 1;
              }
            } 
          } 
        }


        if ($('#work-toggle').prop("checked")) {
          freeTime += 1;
        } else {
          freeTime -= 1;

        }


        updateCounter();
        updateFreeTime();
        if (freeTime <= 0) {
          clearInterval(interval);
          alert("Out of free time")
          disable(stopButton);
          activate(resetButton);
      }
      }, 100);

      //if (!startTime) { startTime = setTime(); }
        
      disable(startButton);
      activate(stopButton);
      disable(resetButton);
    });

    

    //This shows what happens when the stop button is clicked

    stopButton.click(function() {
      clearInterval(interval);
      disable(stopButton);
      activate(startButton);
      activate(resetButton);
      
      //stopTime = setTime(); 
    });


    resetButton.click(reset);
});
    
  


function disable(button) {
  button.prop("disabled", true);
}

function activate(button) {
  button.prop("disabled", false);
}

function reset() {
  //totalTime = counterTime;
  //startTime = undefined;


  seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0;
      
  updateCounter();
  activate($('#start-button'));
}
/*
function setTime(time) {
  var dateObj = new Date();
  return dateObj.toLocaleTimeString();
}
*/

function setCounter (h, tm, m, ts, s) {
  return h + ":" + tm + m + ":" + ts + s;
}

function updateCounter() {
  counterTime = setCounter(hours, tenMinutes, minutes, tenSeconds, seconds);
  $('#counter').text(counterTime);
 
}

function updateFreeTime() {
  if (freeTime >= 60) {
    var freeMinutes = Math.floor(freeTime/60);
    var freeSeconds = parseInt(freeTime % 60);
    if (freeMinutes == 1) {
      $('#free').text(freeMinutes + " minute " + freeSeconds + " seconds" );
    }
    else {
      $('#free').text(freeMinutes + " minutes " + freeSeconds + " seconds" );
    }
    
  } 
  else {
    $('#free').text(freeTime + " seconds");
  }
   
}

function toggle() {
  $('#free-toggle').bootstrapToggle('enable');
  $('#free-toggle').bootstrapToggle('toggle');
  $('#free-toggle').bootstrapToggle('disable');
  $('#work-toggle').bootstrapToggle('enable');
  $('#work-toggle').bootstrapToggle('toggle');
  $('#work-toggle').bootstrapToggle('disable');
  reset();

}
