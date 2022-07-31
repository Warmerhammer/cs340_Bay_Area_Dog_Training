function showAddPackage() {
  document.getElementById("add-package-block").style.display = 'block';
  document.getElementById("update-package-block").style.display = 'none';
  document.getElementById("delete-package-block").style.display = 'none';
}

// Get the objects we need to modify
let addpackageForm = document.getElementById('add-package-form');

// Modify the objects we need
addpackageForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let sessionType = document.getElementById("add_session_type")
  let packageSessions = document.getElementById("add_package_sessions");
  let salePrice = document.getElementById("add_sale_price");

  // Put our data we want to send in a javascript object
  let data = {
    id_session_type: sessionType.value,
    package_sessions: packageSessions.value,
    sale_price: salePrice.value
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-package-form", true);
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