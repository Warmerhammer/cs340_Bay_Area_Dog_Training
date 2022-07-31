
// Get the objects we need to modify
let updateDogForm = document.getElementById('update-dog-form');
let dogDiv = document.getElementById('update-dog-block');

function showUpdateForm(id_dog) {
  let link = '/dog-by-id'
  link += '?' + `id_dog=${id_dog}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];
      let customers = response.customers;
      document.getElementById("dog").setAttribute('value', data.id_dog)
      let customerSelect = document.getElementById("customer-update")
      // remove option reference: https://www.techiedelight.com/remove-all-options-from-drop-down-javascript/
      // code to remove current options
      customerSelect.querySelectorAll('option').forEach(o => o.remove());
      let option1 = document.createElement("option")
      option1.value = data.id_customer
      option1.text = data.customer
      customerSelect.add(option1)

      for (const customer of customers) {
        if (customer.id_customer !== data.id_customer) {
          let option = document.createElement("option")
          option.value = customer.id_customer
          option.text = customer.name
          customerSelect.add(option)
        }
      }

      document.getElementById("input-name-update").setAttribute('value', data.name)
      document.getElementById("input-age-update").setAttribute('value', data.age)
      document.getElementById("input-breed-update").setAttribute('value', data.breed)
      document.getElementById("input-temperament-update").setAttribute('value', data.temperament)
      document.getElementById("input-vaccinated-update").setAttribute('value', data.vaccinated)

      dogDiv.style.display = 'block';
      document.getElementById("add-dog-block").style.display = 'none';
      document.getElementById("delete-dog-block").style.display = 'none';

    }
  })
}


// Modify the objects we need
updateDogForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let customerID = document.getElementById("customer-update");
  let dogID = document.getElementById("dog");
  let inputName = document.getElementById("input-name-update");
  let inputAge = document.getElementById("input-age-update");
  let inputBreed = document.getElementById("input-breed-update");
  let inputTemperament = document.getElementById("input-temperament-update");
  let inputVaccinated = document.getElementById("input-vaccinated-update")


  // Put our data we want to send in a javascript object
  let data = {
    id_customer: customerID.value,
    id_dog: dogID.value,
    name: inputName.value,
    age: inputAge.value,
    breed: inputBreed.value,
    temperament: inputTemperament.value,
    vaccinated: inputVaccinated.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/update-dog", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      alert("Success!")
      location.reload()

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      alert("Invalid input.")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

