//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showAddDhts() {
  document.getElementById("add-dhts-block").style.display = 'block';
  document.getElementById("update-dhts-block").style.display = 'none';
  document.getElementById("delete-dhts-block").style.display = 'none';
}


// Get the objects we need to modify
let addDhtsForm = document.getElementById('add-dhts-form');

// Modify the objects we need
addDhtsForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let dog = document.getElementById("select-add-dhts-dog-name");
  let training_session = document.getElementById("select-add-dhts-training-session");
  let customerFeedback = document.getElementById("input-customer-feedback");

  // Put our data we want to send in a javascript object
  let data = {
    id_dog: dog.value,
    id_training_session: training_session.value,
    customer_feedback: customerFeedback.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-dhts", true);
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