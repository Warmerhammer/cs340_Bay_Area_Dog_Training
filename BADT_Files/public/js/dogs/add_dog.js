function showAddDog() {
  document.getElementById("add-dog-block").style.display = 'block';
  document.getElementById("update-dog-block").style.display = 'none';
  document.getElementById("delete-dog-block").style.display = 'none';
}

// Get the objects we need to modify
let addDogForm = document.getElementById('add-dog-form');

// Modify the objects we need
addDogForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let customerID = document.getElementById("customer")
  let dogName = document.getElementById("input-name");
  let age = document.getElementById("input-age");
  let breed = document.getElementById("input-breed");
  let temperament = document.getElementById("input-temperament");
  let vaccinated = document.getElementById("input-vaccinated");

  // Put our data we want to send in a javascript object
  let data = {
    id_customer: customerID.value,
    dog_name: dogName.value,
    age: age.value,
    breed: breed.value,
    temperament: temperament.value,
    vaccinated: vaccinated.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-dog-form", true);
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