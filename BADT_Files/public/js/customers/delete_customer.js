//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// code for deletePerson function using jQuery
function showDeleteForm(id_customer) {
    let link = '/customer-by-id';
    link += '?' + `id_customer=${id_customer}`

    $.ajax({
        url: link,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            let data = response.data[0];

            document.getElementById("delete-id-customer").innerHTML = data.id_customer;
            document.getElementById("delete-name").innerHTML = data.name;
            document.getElementById("delete-email").innerHTML = data.email;
            document.getElementById("delete-phone-number").innerHTML = data.phone_number;

            document.getElementById("delete-customer-block").style.display = "block";
            document.getElementById("update-customer-form-ajax").style.display = "none";
            document.getElementById("add-customer-form").style.display = "none";

            document.getElementById("button-delete-customer").addEventListener('click', function () { deleteCustomer(data.id_customer) });

        }
    });
}


function deleteCustomer(id_customer) {
    let link = '/delete-customer';
    let data = {
        id_customer: id_customer
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            alert("Successful Deletion!")
            location.reload()
        }
    });
}