//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showUpdateTrainer(id_trainer) {
    let link = '/trainer-by-id';
    link += '?' + `id_trainer=${id_trainer}`

    $.ajax({
        url: link,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        let data = response.data[0];

        document.getElementById("update_id_trainer").setAttribute('value', data.id_trainer)
    
        document.getElementById("update-trainer-block").style.display = "block";
        document.getElementById("add-trainer-block").style.display = "none";
        document.getElementById("delete-trainer-block").style.display = 'none';
        }
    })
}



// Get the objects we need to modify
let updateTrainerForm = document.getElementById("update-trainer-form");

// Modify the objects we need
updateTrainerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let ID = document.getElementById("update_id_trainer");
    
    let inputName = document.getElementById("input-name-update");
    let inputPhoneNumber = document.getElementById("input-phone-number-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputWage = document.getElementById("input-wage-update");
    let inputSessionsTaught = document.getElementById("input-sessions-taught-update");
    let inputStartDate = document.getElementById("input-start-date-update");
    let inputPreferredSchedule = document.getElementById("input-preferred-schedule-update");

    // Put our data we want to send in a javascript object
    let data = {
        id_trainer: ID.value,
        name: inputName.value,
        phone_number: inputPhoneNumber.value,
        email: inputEmail.value,
        wages: inputWage.value,
        sessions_taught: inputSessionsTaught.value,
        start_date: inputStartDate.value,
        preferred_schedule: inputPreferredSchedule.value,
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-trainer", true);
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

    let table = document.getElementById("trainer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == idValue) {

            // Get the location of the row where we found the matching idValue
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of name, email, phone_number, and dogs_enrolled values
            let tdName = updateRowIndex.getElementsByTagName("td")[1];
            let tdPhoneNUmber = updateRowIndex.getElementsByTagName("td")[2];
            let tdEmail = updateRowIndex.getElementsByTagName("td")[3];
            let tdWages = updateRowIndex.getElementsByTageName("td")[4];
            let tdSessionsTaught = updateRowIndex.getElementsByTagName("td")[5];
            let tdStartDate = updateRowIndex.getElementsByTagName("td")[6];
            let tdPreferredSchedule = updateRowIndex.getElementsByTagName("td")[7];

            // Reassign td to updated values
            tdName.innerHTML = parsedData[1].name;
            tdPhoneNUmber.innerHTML = parsedData[2].phone_number;
            tdEmail.innerHTML = parsedData[3].email;
            tdWages.innerHTML = parsedData[4].wages;
            tdSessionsTaught.innerHTML = parsedData[5].sessions_taught;
            tdStartDate.innerHTML = parsedData[6].start_date;
            tdPreferredSchedule.innerHTML = parsedData[7].preferred_schedule;       
        }
    }
    location.reload()
}

