
// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("mySelect");
    let inputName = document.getElementById("input-name-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhoneNumber = document.getElementById("input-phone-number-update");
    let inputDogsEnrolled = document.getElementById("input-dogs-enrolled-update");

    // Get the values from the form fields
    let idValue = inputID.value;
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    let dogsEnrolledValue = inputDogsEnrolled.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(nameValue)) {
    //     return;
    // }

    // if (isNaN(dogsEnrolledValue)) {
    //     return;
    // }

    // Put our data we want to send in a javascript object
    let data = {
        id_customer: idValue,
        name: nameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
        number_of_dogs_enrolled: dogsEnrolledValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, idValue) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == idValue) {

            // Get the location of the row where we found the matching idValue
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of name, email, phone_number, and dogs_enrolled values
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[2];
            let tdPhoneNUmber = updateRowIndex.getElementsByTagName("td")[3];
            let tdDogsEnrolled = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign td to updated values
            tdName.innerHTML = parsedData[1].name;
            tdEmail.innerHTML = parsedData[2].email;
            tdPhoneNUmber.innerHTML = parsedData[3].phone_number;
            tdDogsEnrolled.innerHTML = parsedData[4].number_of_dogs_enrolled;
        }
    }
    location.reload()
}

