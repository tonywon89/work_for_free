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

var interval;
  
$(document).ready(function(){

  // Starts the initial counter and freetime to display.
  updateAll();
 
  // Prevents the stop and reset button from being functional when timer is not running
  disable($('#reset-button'));
  
  //When this is clicked, the button is disabled, and the time starts.
  $('#start-button').on('click', startClick);

  // When the reset button is clicked, resets the counter and saves the data
  $('#reset-button').click(reset);

  $(':radio').click(function(){
    // Only execute if the timer is running. Otherwise, nothing happens
    if (timer) {
      clearInterval(interval);;
      reset();
    }
  });
});
    

/* Defined Functions */

function startClick() {
  // Doesn't all time to start if FreeTime is 0 and the button is relax
  if (freeTime == 0 && $('input[type=radio]:checked').val() == "relax")  {
      alert("Out of free time. Please do some work before relaxing some more!")
      if (spentTime > 0) { activate($('#reset-button')); }
      return;
  }

  if ($('input[type=radio]:checked').length == 0) {
    alert("You need to make a work or relax button!");
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

    // Sets the color of the timer when it is running to be work color or relax color
    $storedButton.val() == "work" ? $('#counter').attr("class", "counter-work") : $('#counter').attr("class", "counter-relax")
    

    spentTime += 1;

    // updates the counter and FreeTime in real time
    updateAll();

    if (freeTime == 0 && $('input[type=radio]:checked').val() == "relax") {
      clearInterval(interval);
      alert("Out of free time. Please do some work before relaxing some more!")
      if (spentTime > 0) { activate($('#reset-button')); }
     
      return;
    }    
  }, 1000);
  
  // Ensures only stop button is functional when the timer is running  
  disable($('#start-button'));
  activate($('#reset-button'));
  
}

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
  clearInterval(interval);
  
  // Resets the counter time
  seconds = 0, tenSeconds = 0, minutes = 0, tenMinutes = 0, hours = 0;
      
  updateCounter();


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

    // Fades in the alert
    $('#notice').animate({opacity: 1.0}).text($storedButton.attr("class") + " activity saved!").delay(2000).animate({opacity: 0.0});


    // Sets the timer to not be running, and inidicate that there is no data to be saved
    timer = false;
  }
  
  // Reset the activity time to 0 
  spentTime = 0;

  activate($('#start-button'));
  disable($('#reset-button'));
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

