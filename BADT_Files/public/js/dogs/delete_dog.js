//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeleteForm(id_dog) {
  let link = '/dog-by-id';
  link += '?' + `id_dog=${id_dog}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];

      document.getElementById("td-customer-delete").innerHTML = data.customer
      document.getElementById("td-id-dog-delete").innerHTML = data.id_dog
      document.getElementById("td-name-delete").innerHTML = data.name
      document.getElementById("td-age-delete").innerHTML = data.age
      document.getElementById("td-breed-delete").innerHTML = data.breed
      document.getElementById("td-temperament-delete").innerHTML = data.temperament
      document.getElementById("td-vaccinated-delete").innerHTML = data.vaccinated

      document.getElementById("delete-dog-block").style.display = "block";
      document.getElementById("update-dog-block").style.display = "none";
      document.getElementById("add-dog-block").style.display = "none";

      document.getElementById("button-delete-dog").addEventListener('click', function () { deleteDog(data.id_dog) });
    }
  })
}

// code for deletePerson function using jQuery
function deleteDog(id_dog) {
  let link = '/delete-dog';
  let data = {
    id_dog: id_dog
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      location.reload()
    }
  });
}