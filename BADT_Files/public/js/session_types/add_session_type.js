function showAddSessionTypes() {
  document.getElementById("add-session-type-block").style.display = 'block';
  document.getElementById("delete-session-type-block").style.display = 'none';
}

// Get the objects we need to modify
let addSessionTypeForm = document.getElementById('add-session-type-form');

// Modify the objects we need
addSessionTypeForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let sessionType = document.getElementById("add-session-type")
  let maxCapacity = document.getElementById("add-max-capacity");

  // Put our data we want to send in a javascript object
  let data = {
    id_session_type: sessionType.value,
    max_capacity: maxCapacity.value,
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-session-type", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      alert("Success!")
      location.reload()

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      alert("Invalid Input")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})