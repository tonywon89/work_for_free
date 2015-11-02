
//variables to set the counter
var seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0; 

var counterTime, freeTime = gon.freeTime, spentTime = 0; //will change the free time to load to become what was stored in the database

var timer = false
var $storedButton;
//var startTime, stopTime, totalTime;

  
$(document).ready(function(){
 /*
  // loads the bootstrap-toggle js library, since the pipeline isn't working
  $.getScript("https://gitcdn.github.io/bootstrap-toggle/2.2.0/js/bootstrap-toggle.min.js", function(){
    //$('#work-toggle').bootstrapToggle();
    //$('#free-toggle').bootstrapToggle();
    $('#work-toggle').bootstrapToggle('disable');
    $('#free-toggle').bootstrapToggle('disable');
  });
*/
    //starts the initial counter and freetime to display.
    updateAll();

    //initializes the buttons and interval
    var startButton = $('#start-button'), stopButton = $('#stop-button'), resetButton = $('#reset-button');
    var interval;


    //prevents the stop button from being functional when it is 0
    disable(stopButton);
    disable(resetButton);
    
    //When this is clicked, the button is disabled, and the time starts.
    startButton.click(function(){
      timer = true;
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

        // updates the free time depending on whether the work-toggle button is on
        if ($('input[type=radio]:checked').val() == "work") {
          freeTime += 1;
        } else {
          freeTime -= 1;
        }

        $storedButton = $('input[type=radio]:checked')

        spentTime += 1;

        // updates the counter and FreeTime in real time
        updateAll();

        //stops the time when FreeTime reaches 0
        if (freeTime <= 0) {
          clearInterval(interval);
          alert("Out of free time")
          disable(stopButton);
          activate(resetButton);
      }
      }, 100);

      //if (!startTime) { startTime = setTime(); }
      
      //ensures only stop button is functional when the timer is running  
      disable(startButton);
      activate(stopButton);
      disable(resetButton);

    });

    

    //This shows what happens when the stop button is clicked

    stopButton.click(function() {

      //stops time and reactivates and disables buttons
      clearInterval(interval);
      disable(stopButton);
      activate(startButton);
      activate(resetButton);
      
      //stopTime = setTime(); 
    });

    //resets counter when reset button is clicked and resets buttons
    resetButton.click(reset);

    // Stops the timer, and saves the data 
    $(':radio').click(function(){
      if (timer) {
        clearInterval(interval);
        disable(stopButton);
        activate(resetButton);
        reset();
      }

    });
});
    



// Disables the button so it cannot be clicked  
function disable(button) {
  button.prop("disabled", true);
}

// Activates the button so it can be clicked
function activate(button) {
  button.prop("disabled", false);
}

// resets the counter and the buttons to initial conditions
function reset() {
  //totalTime = counterTime;
  //startTime = undefined;

  //resets the counter time
  seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0;
      
  updateCounter();
  activate($('#start-button'));
  disable($('#reset-button'))


  // Check if timer is running, and only execute if it is
  if (timer) {
    // Determine if button selected is work or not 
    var workOrRelax;

    // The description of the activity
    var description;

    //Set the workOrRelax value to be a boolean instead of a string
    if ($storedButton.val() == "work") {
      workOrRelax = true;
    } else {
      workOrRelax = false;
    }

    // stores the description as the class of the stored button
    description = $storedButton.attr('class');

    // Sends an AJAX request to the users controller, show action in order to save the data as a record 
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/users/" + gon.user["id"] + "?ftime=" + freeTime + 
    "&is_work=" + workOrRelax + "&description=" + description + "&stime=" + spentTime, true);
    xhttp.send();

    // sets the timer to not be running
    timer = false;
  }



  //console.log(gon.workRelaxButtons)
  
  spentTime = 0;
}
/*
function setTime(time) {
  var dateObj = new Date();
  return dateObj.toLocaleTimeString();
}
*/

// returns a string of the counter time
function setCounter (h, tm, m, ts, s) {
  return h + ":" + tm + m + ":" + ts + s;
}

// updates the counter in real time to display on the webpage
function updateCounter() {
  counterTime = setCounter(hours, tenMinutes, minutes, tenSeconds, seconds);
  $('#counter').text(counterTime);
 
}

// updates the display of the free time
function updateFreeTime() {
  if (freeTime >= 60) {

    // Converts the FreeTime from seconds to minutes and seconds
    var freeMinutes = Math.floor(freeTime/60);
    var freeSeconds = parseInt(freeTime % 60);

    // To display plural minutes or singular
    if (freeMinutes == 1) {
      $('#free').text(freeMinutes + " minute " + freeSeconds + " seconds" );
    }
    else {
      $('#free').text(freeMinutes + " minutes " + freeSeconds + " seconds" );
    }
    
  } else {
    $('#free').text(freeTime + " seconds");
  }
}

function updateAll() {
  updateCounter();
  updateFreeTime();
}


/*
// Toggles the buttons and resets the counter. Disables toggle so it cannot be clicked
function toggle() {
  $('#free-toggle').bootstrapToggle('enable');
  $('#free-toggle').bootstrapToggle('toggle');
  $('#free-toggle').bootstrapToggle('disable');
  $('#work-toggle').bootstrapToggle('enable');
  $('#work-toggle').bootstrapToggle('toggle');
  $('#work-toggle').bootstrapToggle('disable');
  reset();
}
*/
