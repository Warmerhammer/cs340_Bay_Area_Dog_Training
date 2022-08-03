
function showAddThts() {
document.getElementById("add-thts-block").style.display = 'block';
document.getElementById("delete-thts-block").style.display = 'none';
}


// Get the objects we need to modify
let addThtsForm = document.getElementById('add-thts-form');

// Modify the objects we need
addThtsForm.addEventListener("submit", function (e) {

// Prevent the form from submitting
e.preventDefault();

// Get form fields we need to get data from
let trainer = document.getElementById("select-add-thts-trainer-name");
let training_session = document.getElementById("select-add-thts-training-session");
// let customerFeedback = document.getElementById("input-customer-feedback");

// Put our data we want to send in a javascript object
let data = {
    id_trainer: trainer.value,
    id_training_session: training_session.value,
//   customer_feedback: customerFeedback.value
}

// Setup our AJAX request
var xhttp = new XMLHttpRequest();
xhttp.open("POST", "/add-thts", true);
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