//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// code for deletePerson function using jQuery
function showUpdateTrainingSession(id_training_session) {
  let link = '/training-session-by-id';
  link += '?' + `id_training_session=${id_training_session}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];
      let session_types = response.session_types;

      document.getElementById("input-id-training-session").setAttribute('value', data.id_training_session);
      document.getElementById("input-date-scheduled").setAttribute('value', data.date_scheduled);
      let trainingSessionSelect = document.getElementById("input-id-session-type")
      trainingSessionSelect.querySelectorAll('option').forEach(o => o.remove());
      let option1 = document.createElement('option')
      option1.text = data.id_session_type
      option1.value = data.id_session_type
      trainingSessionSelect.add(option1)

      for (const session_type of session_types) {
        // if option1 has been added above skip repeat value
        console.log(session_type)
        if (session_type.id_session_type !== data.id_session_type) {
          let option = document.createElement('option')
          option.value = session_type.id_session_type
          option.text = session_type.id_session_type
          trainingSessionSelect.add(option)
        }
      }

      document.getElementById('update-training-session-block').style.display = 'flex';
      document.getElementById('add-training-session-block').style.display = 'none';
      document.getElementById('delete-training-session-block').style.display = 'none';
    }
  });
}

// Get the objects we need to modify
let updateTrainingSessionForm = document.getElementById('update-training-session-form');

// Modify the objects we need
updateTrainingSessionForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let trainingSessionID = document.getElementById("input-id-training-session");
  let dateScheduled = document.getElementById("input-date-scheduled");
  let sessionType = document.getElementById("input-id-session-type");

  // Put our data we want to send in a javascript object
  let data = {
    id_training_session: trainingSessionID.value,
    date_scheduled: dateScheduled.value,
    id_session_type: sessionType.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/update-training-session", true);
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
