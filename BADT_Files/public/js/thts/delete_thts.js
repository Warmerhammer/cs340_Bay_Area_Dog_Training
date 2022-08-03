
function showDeleteTHTS(id_trainer, id_training_session) {
let link = '/thts-by-id';
link += '?' + `id_trainer=${id_trainer}&id_training_session=${id_training_session}`

$.ajax({
    url: link,
    type: 'GET',
    contentType: "application/json; charset=utf-8",
    success: function (response) {
    let data = response.data[0];

    document.getElementById("td-delete-thts-id-trainer").innerHTML = data.id_trainer
    document.getElementById("td-delete-thts-id-training-session").innerHTML = data.id_training_session
    
    document.getElementById("delete-thts-block").style.display = "block";
    document.getElementById("add-thts-block").style.display = "none";

    document.getElementById("button-thts-delete").addEventListener('click', function () { deleteTHTS(data.id_trainer, data.id_training_session) });
    }

})

}

// code for deletePerson function using jQuery
function deleteTHTS(id_trainer, id_training_session) {
let link = '/delete-thts';
let data = {
    id_trainer: id_trainer,
    id_training_session: id_training_session
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