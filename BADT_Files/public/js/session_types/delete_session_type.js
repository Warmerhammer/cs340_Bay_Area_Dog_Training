function showDeleteForm(id_session_type) {
  let link = '/session-type-by-id';
  link += '?' + `id_session_type=${id_session_type}`
  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      console.log('data :', response)

      let data = response.data[0];

      document.getElementById("td-delete-id-session-type").innerHTML = data.id_session_type
      document.getElementById("td-delete-max-capacity").innerHTML = data.max_capacity

      document.getElementById("delete-session-type-block").style.display = "block";
      document.getElementById("add-session-type-block").style.display = "none";

      document.getElementById("button-delete-session-type").addEventListener('click', function () { deleteSessionType(data.id_session_type) });
    }
  })
}

// code for deletePerson function using jQuery
function deleteSessionType(id_session_type) {
  let link = '/delete-session-type';
  let data = {
    id_session_type
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      alert("Successful Deletion!");
      location.reload();
    }
  });
}