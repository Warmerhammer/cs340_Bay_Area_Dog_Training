//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showUpdateForm(id_package) {
  let link = '/package-by-id';
  link += '?' + `id_package=${id_package}`

  $.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      let data = response.data[0];
      let session_types = response.session_types

      document.getElementById("update_id_package").setAttribute('value', data.id_package)

      let sessionSelect = document.getElementById("update_session_type")
      sessionSelect.querySelectorAll('option').forEach(o => o.remove());
      let option1 = document.createElement("option");
      option1.value = data.id_session_type;
      option1.text = data.id_session_type;
      sessionSelect.add(option1)

      for (const st of session_types) {
        if (st.id_session_type !== data.id_session_type) {
          let option = document.createElement("option");
          option.value = st.id_session_type;
          option.text = st.id_session_type
          sessionSelect.add(option)
        }
      }

      document.getElementById("update_package_sessions").value = data.package_sessions
      document.getElementById("update_sale_price").value = data.sale_price


      document.getElementById("delete-package-block").style.display = "none";
      document.getElementById("update-package-block").style.display = "block";
      document.getElementById("add-package-block").style.display = "none";
    }
  })
}

let updatePackageForm = document.getElementById("update-package-form");

// Modify the objects we need
updatePackageForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let packageID = document.getElementById("update_id_package");
  let sessionType = document.getElementById("update_session_type");
  let packageSessions = document.getElementById("update_package_sessions");
  let salePrice = document.getElementById("update_sale_price");

  // Put our data we want to send in a javascript object
  let data = {
    id_package: packageID.value,
    id_session_type: sessionType.value,
    package_sessions: packageSessions.value,
    sale_price: salePrice.value,
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/update-package", true);
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