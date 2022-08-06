//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showDeletePurchases(id_purchase, quantity, id_customer, id_package) {
    let link = '/purchases-by-id';
    link += '?' + `id_purchase=${id_purchase}&quantity=${quantity}&id_customer=${id_customer}&id_package=${id_package}`
    
    $.ajax({
        url: link,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        let data = response.data[0];
    
        document.getElementById("td-delete-purchases-id-purchases").innerHTML = data.id_purchase
        document.getElementById("td-delete-purchases-quantity").innerHTML = data.quantity
        document.getElementById("td-delete-purchases-id-customer").innerHTML = data.id_customer
        document.getElementById("td-delete-purchases-id-package").innerHTML = data.id_package

        document.getElementById("delete-purchases-block").style.display = "block";
        document.getElementById("add-purchases-block").style.display = "none";
    
        document.getElementById("button-purchases-delete").addEventListener('click', function () { deletePurchases(data.id_purchase, data.quantity, data.id_customer, data.id_package) });
        }
    
    })

}

// code for deletePerson function using jQuery
function deletePurchases(id_purchase, quantity, id_customer, id_package) {
let link = '/delete-purchases';
let data = {
    id_purchase: id_purchase,
    quantity: quantity,
    id_customer: id_customer,
    id_package: id_package
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