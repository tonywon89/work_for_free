/* Global variables */

// Variables for the counter
var seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0; 

// Keeps track of the free time stored by the user
var freeTime = gon.freeTime;

// Keeps track of the indiviual activity
var spentTime = 0;

// Keeps track of whether the timer is running or not 
var timer = false;

// Keeps track of the radio button that is checked when the data is submitted
var $storedButton;

  
$(document).ready(function(){

  // Starts the initial counter and freetime to display.
  updateAll();

  // Initializes the buttons and interval
  var startButton = $('#start-button'), stopButton = $('#stop-button'), resetButton = $('#reset-button');
  var interval;

  // Prevents the stop and reset button from being functional when timer is not running
  disable(stopButton);
  disable(resetButton);
  
  //When this is clicked, the button is disabled, and the time starts.
  startButton.click(function(){
    //stops the time when FreeTime reaches 0
    if (freeTime == 0 && $('input[type=radio]:checked').val() == "free") {
        clearInterval(interval);
        alert("Out of free time. Please do some work before relaxing some more!")
        disable(stopButton);
        if (spentTime > 0) { activate(resetButton); }
        return;
    }

    timer = true;

    // Update the counter when the interval executes, and is stored in the variable to be stopped later
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

      // Updates the free time depending on whether work or relax button is selected
      $('input[type=radio]:checked').val() == "work" ? freeTime += 1 : freeTime -= 1;

      // Stores the selected radio button for data submission when reset button is clicked
      $storedButton = $('input[type=radio]:checked')

      spentTime += 1;

      // updates the counter and FreeTime in real time
      updateAll();

      if (freeTime == 0 && $('input[type=radio]:checked').val() == "free") {
        clearInterval(interval);
        alert("Out of free time. Please do some work before relaxing some more!")
        disable(stopButton);
        if (spentTime > 0) { activate(resetButton); }
       
        return;
    }    

    
    }, 100);
    
    // Ensures only stop button is functional when the timer is running  
    disable(startButton);
    activate(stopButton);
    disable(resetButton);

  });

  //This shows what happens when the stop button is clicked
  stopButton.click(function() {

    // Stops the counter and reactivates and disables buttons
    clearInterval(interval);
    disable(stopButton);
    activate(startButton);
    activate(resetButton);
  });

  // When the reset button is clicked, resets the counter and saves the data
  resetButton.click(reset);

  $(':radio').click(function(){
    // Only execute if the timer is running. Otherwise, nothing happens
    if (timer) {
      clearInterval(interval);
      disable(stopButton);
      activate(resetButton);
      reset();
    }
  });
});
    

/* Defined Functions */

// Disables the button so it cannot be clicked  
function disable(button) {
  button.prop("disabled", true);
}

// Activates the button so it can be clicked
function activate(button) {
  button.prop("disabled", false);
}

/* Resets the counter and the buttons to initial conditions. 
 * Also sends an AJAX request to server to save the free time data and activity data
 */
function reset() {

  // Resets the counter time
  seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0;
      
  updateCounter();
  activate($('#start-button'));
  disable($('#reset-button'))

  /* Execute AJAX request only if the timer has been set to true by clicking the start button,
   * indicating that there is data to store
   */
  if (timer) {

    // Set the workOrRelax value to true or false depending if it is work or not
    var workOrRelax = $storedButton.val() == "work" ? true : false;

    // Stores the description of the activity as the class of the stored button
    var description = $storedButton.attr('class');

    // Stores the url that will be used by the AJAX request
    var url = "/users/" + gon.user["id"] + "?ftime=" + freeTime + 
      "&is_work=" + workOrRelax + "&description=" + description + "&stime=" + spentTime

    // Sends an AJAX request to the users controller, show action in order to save the data as a record 
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();

    // Sets the timer to not be running, and inidicate that there is no data to be saved
    timer = false;
  }
  
  // Reset the activity time to 0 
  spentTime = 0;
}

// returns a string of the counter time
function setCounter (h, tm, m, ts, s) {
  return h + ":" + tm + m + ":" + ts + s;
}

// updates the counter in real time to display on the webpage
function updateCounter() {
  $('#counter').text(setCounter(hours, tenMinutes, minutes, tenSeconds, seconds));
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

