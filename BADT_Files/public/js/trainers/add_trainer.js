//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showAddTrainer() {
    document.getElementById("add-trainer-block").style.display = 'block';
    document.getElementById("update-trainer-block").style.display = 'none';
    document.getElementById("delete-trainer-block").style.display = 'none';
}

// Creates a single row from an Object representing a single record from the entity table
addRowToTable = (data) => {

    document.getElementById("button-delete-dog").addEventListener('click', function () { deleteDog(data.id_trainer) });

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("trainer-table");

    // Get the location where we should insert the new row (end of table)
    // let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let wagesCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");
    let sessionsTaughtCell = document.createElement("TD");
    let startDateCell = document.createElement("TD");
    let preferredScheduleCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.id_trainer;
    wagesCell.innerText = newRow.wages;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneNumberCell.innerText = newRow.phone_number;
    sessionsTaughtCell.innerText = newRow.number_of_sessions_taught;
    startDateCell.innerText = newRow.start_date;
    preferredScheduleCell.innerText = newRow.preferred_schedule;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteTrainer(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(wagesCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(sessionsTaughtCell);
    row.appendChild(startDateCell);
    row.appendChild(preferredScheduleCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);

}



// // Get the objects we need to modify
// let addTrainerForm = document.getElementById('add-trainer-form');

// // Modify the objects we need
// addTrainerForm.addEventListener("submit", function (e) {

// // Prevent the form from submitting
// e.preventDefault();

// // Get form fields we need to get data from
// let name = document.getElementById("input-name");
// let phoneNumber = document.getElementById("input-phone-number");
// let email = document.getElementById("input-email");
// let wage = document.getElementById("input-wage");
// let startDate = document.getElementById("input-start-date");
// let preferredSchedule = document.getElementById("input-preferred-schedule");

// // Put our data we want to send in a javascript object
// let data = {
//     name: name.value,
//     phone_number: phoneNumber.value,
//     email: email.value,
//     wage: wage.value,
//     start_date: startDate.value,
//     preferred_schedule: preferredSchedule.value
// }

// // Setup our AJAX request
// var xhttp = new XMLHttpRequest();
// xhttp.open("POST", "/add-trainer-form", true);
// xhttp.setRequestHeader("Content-type", "application/json");

// // Tell our AJAX request how to resolve
// xhttp.onreadystatechange = () => {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {

//     // Add the new data to the table
//     alert("Success!")
//     location.reload()

//     }
//     else if (xhttp.readyState == 4 && xhttp.status != 200) {
//     alert("Invalid Input")
//     }
// }

// // Send the request and wait for the response
// xhttp.send(JSON.stringify(data));

// });