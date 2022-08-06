//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

// code for deletePerson function using jQuery
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
            deleteRow(id_customer);
        }
    });
}


function deleteRow(id_customer) {
    let table = document.getElementById("customer-table");
    console.log('id_customer: ', id_customer)
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == id_customer) {
            table.deleteRow(i);
            break;
        }
    }
    location.reload()
}