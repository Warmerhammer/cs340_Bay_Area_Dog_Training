//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeleteDHTS(id_dog, id_training_session) {
  let link = '/dhts-by-id';
  link += '?' + `id_dog=${id_dog}&id_training_session=${id_training_session}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];

      document.getElementById("td-delete-dhts-id-dog").innerHTML = data.id_dog
      document.getElementById("td-delete-dhts-dog-name").innerHTML = data.dog_name
      document.getElementById("td-delete-dhts-id-training-session").innerHTML = data.id_training_session
      document.getElementById("td-delete-dhts-tsDate").innerHTML = data.ts_date
      document.getElementById("td-delete-dhts-tsType").innerHTML = data.ts_type
      document.getElementById("td-delete-dhts-customer-feedback").innerHTML = data.customer_feedback

      document.getElementById("delete-dhts-block").style.display = "block";
      document.getElementById("update-dhts-block").style.display = "none";
      document.getElementById("add-dhts-block").style.display = "none";

      document.getElementById("button-dhts-delete").addEventListener('click', function () { deleteDHTS(data.id_dog, data.id_training_session) });
    }
  })
}

// code for deletePerson function using jQuery
function deleteDHTS(id_dog, id_training_session) {
  let link = '/delete-dhts';
  let data = {
    id_dog,
    id_training_session
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      location.reload();
      alert("Successful Deletion!");
    }
  });
}