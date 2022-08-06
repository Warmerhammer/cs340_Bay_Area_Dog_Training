//-- Code referenced heavily from Canvas Module Week 7 Project Development -Exploration – Developing in Node.js 
//    and osu-cs340-ecampus / nodejs-starter-app : https://github.com/osu-cs340-ecampus/nodejs-starter-app 

function showAddPurchase() {
    document.getElementById("add-purchases-block").style.display = 'block';
    document.getElementById("delete-purchases-block").style.display = 'none';
    }
    
    
    // Get the objects we need to modify
    let addPurchasesForm = document.getElementById('add-purchases-form');
    
    // Modify the objects we need
    addPurchasesForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    
    // Get form fields we need to get data from
    let customer = document.getElementById("select-add-customer-name");
    let package = document.getElementById("select-add-package-type");
    let quantity = document.getElementById("select-add-quantity");
    // let customerFeedback = document.getElementById("input-customer-feedback");
    
    // Put our data we want to send in a javascript object
    let data = {
        id_customer: customer.value,
        id_package: package.value,
        quantity: quantity.value
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-purchase", true);
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