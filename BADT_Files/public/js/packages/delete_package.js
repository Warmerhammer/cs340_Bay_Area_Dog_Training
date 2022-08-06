//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeleteForm(id_package) {
  let link = '/package-by-id';
  link += '?' + `id_package=${id_package}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];

      document.getElementById("td_delete_id_package").innerHTML = data.id_package
      document.getElementById("td_delete_id_session_type").innerHTML = data.id_session_type
      document.getElementById("td_delete_package_sessions").innerHTML = data.package_sessions
      document.getElementById("td_delete_sale_price").innerHTML = data.sale_price

      document.getElementById("delete-package-block").style.display = "block";
      document.getElementById("update-package-block").style.display = "none";
      document.getElementById("add-package-block").style.display = "none";

      document.getElementById("button-delete-package").addEventListener('click', function () { deletepackage(data.id_package) });
    }
  })
}

// code for deletePerson function using jQuery
function deletepackage(id_package) {
  let link = '/delete-package';
  let data = {
    id_package: id_package
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