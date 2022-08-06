//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeleteTrainingSession(id_training_session) {
  let link = '/training-session-by-id';
  link += '?' + `id_training_session=${id_training_session}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];
      document.getElementById("td-id-training-session-delete").innerHTML = data.id_training_session;
      document.getElementById("td-date-scheduled-delete").innerHTML = data.date_scheduled;
      document.getElementById("td-id-session-type-delete").innerHTML = data.id_session_type

      document.getElementById('add-training-session-block').style.display = 'none';
      document.getElementById('delete-training-session-block').style.display = 'flex';
      document.getElementById('update-training-session-block').style.display = 'none';

      document.getElementById("button-delete-training-session").addEventListener('click', function () { deleteTrainingSession(data.id_training_session) })
    }
  });
}


// code for deletePerson function using jQuery
function deleteTrainingSession(id_training_session) {
  let link = '/delete-training-session';
  let data = {
    id_training_session: id_training_session
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      alert("Deleted!")
      location.reload()
    }
  });
}
