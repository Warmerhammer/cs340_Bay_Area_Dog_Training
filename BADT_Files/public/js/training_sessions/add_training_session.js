let addTrainingSessionBlock = document.getElementById("add-training-session-block");

function showAddTrainingSession() {
  addTrainingSessionBlock.style.display = 'flex';
  document.getElementById("update-training-session-block").style.display = 'none';
  document.getElementById("delete-training-session-block").style.display = 'none';
}


// Get the objects we need to modify
let addTrainingSessionForm = document.getElementById('add-training-session-form');

// Modify the objects we need
addTrainingSessionForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let dateScheduled = document.getElementById("input-date-scheduled-add");
  let sessionType = document.getElementById("select-session-id-add");

  // Put our data we want to send in a javascript object
  let data = {
    date_scheduled: dateScheduled.value,
    id_session_type: sessionType.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-training-session", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      alert("Training Session Added")
      location.reload()

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      alert("Invalid Input")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})