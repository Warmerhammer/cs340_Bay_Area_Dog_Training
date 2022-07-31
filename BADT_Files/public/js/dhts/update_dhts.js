function showUpdateDHTS(id_dog, id_training_session) {
  let link = '/dhts-by-id';
  link += '?' + `id_dog=${id_dog}&id_training_session=${id_training_session}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];
      console.log('data :', data.customer_feedback);

      document.getElementById("textarea-update-dhts").innerHTML = data.customer_feedback
      document.getElementById("update-dhts-dog").value = data.id_dog
      document.getElementById("update-dhts-session").value = data.id_training_session

      document.getElementById('update-dhts-block').style.display = 'block';
      document.getElementById('add-dhts-block').style.display = 'none';
      document.getElementById('delete-dhts-block').style.display = 'none';
    }
  });
}

// Get the objects we need to modify
let updateTrainingSessionForm = document.getElementById('update-dhts-form');

// Modify the objects we need
updateTrainingSessionForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let trainingSessionID = document.getElementById("update-dhts-session");
  let dogID = document.getElementById("update-dhts-dog");
  let customerFeedack = document.getElementById("textarea-update-dhts");

  // Put our data we want to send in a javascript object
  let data = {
    id_training_session: trainingSessionID.value,
    id_dog: dogID.value,
    customer_feedback: customerFeedack.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/update-dhts", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      console.log("Success!")
      location.reload()

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      alert("Invalid Input")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})
