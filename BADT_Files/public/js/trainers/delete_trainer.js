//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeleteForm(id_trainer) {
let link = '/trainer-by-id';
link += '?' + `id_trainer=${id_trainer}`

$.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
    let data = response.data[0];

    document.getElementById("td-id-trainer-delete").innerHTML = data.id_trainer
    document.getElementById("td-wages-delete").innerHTML = data.wages
    document.getElementById("td-name-delete").innerHTML = data.name
    document.getElementById("td-email-delete").innerHTML = data.email
    document.getElementById("td-phone-number-delete").innerHTML = data.phone_number
    document.getElementById("td-sessions-taught-delete").innerHTML = data.sessions_taught
    document.getElementById("td-start-date-delete").innerHTML = data.start_date
    document.getElementById("td-preferred-schedule-delete").innerHTML = data.preferred_schedule

    document.getElementById("delete-trainer-block").style.display = "block";
    document.getElementById("update-trainer-block").style.display = "none";
    document.getElementById("add-trainer-block").style.display = "none";

    document.getElementById("button-delete-trainer").addEventListener('click', function () { deleteTrainer(data.id_trainer) });
    }
})
}

// code for deletePerson function using jQuery
function deleteTrainer(id_trainer) {
let link = '/delete-trainer';
let data = {
    id_trainer: id_trainer
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