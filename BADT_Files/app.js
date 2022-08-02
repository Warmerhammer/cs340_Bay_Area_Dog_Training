// SETUP

//Initialize modules
var express = require("express");
var exphbs = require("express-handlebars").create({ extname: 'hbs', defaultLayout: 'main' });
var path = require("path");
var app = express();

// Database
var db = require('./database/db-connector')
const PORT = 3000;

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Express to Handle JSON and Form Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// HANDLEBARS setting -- shorten file extension to .hbs
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

// GET ROUTES

app.get('/Index', function (req, res) {
    res.render('Index');
});

app.get('/Customers', function (req, res) {
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('Customers', { data: rows });
    });
});

app.get('/Dogs', function (req, res) {
    let query1;
    if (req.query.dname === undefined || req.query.dname === "") {
        query1 = "SELECT * FROM Dogs;";
    }

    else {
        query1 = `SELECT * FROM Dogs WHERE name LIKE '${req.query.dname}'`
    }

    let query2 = "SELECT * FROM Customers"
    db.pool.query(query1, function (error, rows, fileds) {
        let dogs = rows;
        db.pool.query(query2, (err, row, field) => {
            let customers = row;
            let customermap = {};
            customers.map(customer => {
                let id = parseInt(customer.id_customer, 10)
                customermap[id] = customer["name"];
            })

            dogs = dogs.map(dog => {
                let vaccinated = "No"
                if (dog["fully_vaccinated"] == 1) {
                    vaccinated = "Yes"
                }
                return Object.assign(dog, { vaccinated: vaccinated }, { customer: customermap[dog.id_customer] })
            })

            res.render('Dogs', { data: dogs, customers: customers });
        })
    })
});

app.get('/Dog_has_Training_Sessions', function (req, res) {
    let query1 = "SELECT * FROM Dog_Has_Training_Sessions;"
    let query2 = "SELECT * FROM Training_Sessions;"
    let query3 = "SELECT * FROM Dogs;"

    db.pool.query(query1, function (error, rows, fileds) {
        let dhts = rows;
        db.pool.query(query2, (err, row, field) => {
            let training_sessions = row;
            db.pool.query(query3, function (e, r, f) {
                let dogs = r;
                let dogsNameMap = {};
                dogs.map(dog => {
                    let id = parseInt(dog.id_dog, 10)
                    dogsNameMap[id] = dog["name"]
                })

                let tsDateMap = {};
                training_sessions.map(ts => {
                    let tsID = parseInt(ts.id_training_session);
                    tsDateMap[tsID] = ts.date_scheduled
                })

                let tsTypeMap = {};
                training_sessions.map(ts => {
                    let id = parseInt(ts.id_training_session)
                    tsTypeMap[id] = ts.id_session_type
                })

                dhts = dhts.map(single_session => {
                    return Object.assign(single_session,
                        { dog_name: dogsNameMap[single_session.id_dog] },
                        { ts_date: tsDateMap[single_session.id_training_session] },
                        { ts_type: tsTypeMap[single_session.id_training_session] }
                    )
                })

                res.render('Dog_has_Training_Sessions', { data: dhts, dogs, training_sessions });

            })

        })


    })
});

app.get('/dhts-by-id', function (req, res) {
    let dogID = parseInt(req.query.id_dog);
    let tsID = parseInt(req.query.id_training_session);
    // multiple query values reference: https://stackoverflow.com/questions/39331138/how-to-select-using-multiple-variables-in-mysql-with-node-js-and-express
    let query1 = "SELECT * FROM Dog_Has_Training_Sessions WHERE id_dog = ? AND id_training_session = ?";
    let filter = [dogID, tsID]

    db.pool.query(query1, filter, function (error, rows, fileds) {
        let dhts = rows;
        let query2 = "SELECT * FROM Training_Sessions;"
        let query3 = "SELECT * FROM Dogs;"

        db.pool.query(query2, (err, row, field) => {
            let training_sessions = row;
            db.pool.query(query3, function (e, r, f) {
                let dogs = r;
                let dogsNameMap = {};
                dogs.map(dog => {
                    let id = parseInt(dog.id_dog, 10)
                    dogsNameMap[id] = dog["name"]
                })

                let tsDateMap = {};
                training_sessions.map(ts => {
                    let tsID = parseInt(ts.id_training_session);
                    tsDateMap[tsID] = ts.date_scheduled
                })

                let tsTypeMap = {};
                training_sessions.map(ts => {
                    let id = parseInt(ts.id_training_session)
                    tsTypeMap[id] = ts.id_session_type
                })

                dhts = dhts.map(single_session => {
                    return Object.assign(single_session,
                        { dog_name: dogsNameMap[single_session.id_dog] },
                        { ts_date: tsDateMap[single_session.id_training_session] },
                        { ts_type: tsTypeMap[single_session.id_training_session] }
                    )
                })

                res.send({ data: dhts });

            })

        })


    })

});

app.get('/Packages', function (req, res) {
    let query1 = "SELECT * FROM Packages;"
    let query2 = "SELECT * FROM Session_Types;"
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error)
        }

        let packages = rows
        db.pool.query(query2, function (e, r, f) {
            if (e) {
                console.log(e)
            }

            let session_types = r
            res.render('Packages', { data: packages, session_types });
        })
    });
});

app.get('/Purchases', function (req, res) {
    res.render('Purchases');
});

app.get('/Session_Types', function (req, res) {
    let query1 = "SELECT * FROM Session_Types;"
    db.pool.query(query1, function (error, rows, fields) {
        let session_types = rows;
        res.render('Session_Types', { data: session_types })
    })
});

app.get('/Trainers', function (req, res) {
    let query1 = "SELECT * FROM Trainers;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('Trainers', { data: rows });
    });
});

app.get('/Trainer_has_Training_Session', function (req, res) {
    res.render('Trainer_has_Training_Session');
});

app.get('/Training_Sessions', function (req, res) {
    let query1 = "SELECT * FROM Training_Sessions;";
    let query2 = "SELECT * FROM Session_Types";
    db.pool.query(query1, function (error, rows, fields) {
        let training_sessions = rows;
        db.pool.query(query2, function (err, row, field) {
            let session_types = row;
            res.render('Training_Sessions', { data: training_sessions, session_types });
        })

    });
});

app.get('/trainer-by-id', function (req, res) {
    let trainerID = parseInt(req.query.id_trainer);
    let query1 = "SELECT * FROM Trainers WHERE id_trainer = ?";
    db.pool.query(query1, [trainerID], function (error, rows, fields) {
        let trainer = rows;
        res.send({ data: trainer });
    })

});

app.get('/dog-by-id', function (req, res) {
    let dogID = parseInt(req.query.id_dog);
    let query1 = "SELECT * FROM Dogs WHERE id_dog = ?";
    let query2 = "SELECT * FROM Customers"
    db.pool.query(query1, [dogID], function (error, rows, fields) {
        let dogs = rows;
        db.pool.query(query2, (err, row, field) => {
            let customers = row;
            let customermap = {};
            customers.map(customer => {
                let id = parseInt(customer.id_customer, 10)
                customermap[id] = customer["name"];
            })

            dogs = dogs.map(dog => {
                let vaccinated = "No"
                if (dog["fully_vaccinated"] == 1) {
                    vaccinated = "Yes"
                }
                return Object.assign(dog, { vaccinated: vaccinated }, { customer: customermap[dog.id_customer] })
            })


            res.send({ data: dogs, customers: customers });
        })
    })
})



app.get('/package-by-id', function (req, res) {
    let packageID = parseInt(req.query.id_package);
    let query1 = "SELECT * FROM Packages WHERE id_package = ?";
    let query2 = "SELECT * FROM Session_Types"
    db.pool.query(query1, [packageID], function (error, rows, fields) {
        let packages = rows;
        db.pool.query(query2, (err, row, field) => {
            let session_types = row;
            res.send({ data: packages, session_types });
        })
    })
})

app.get('/session-type-by-id', function (req, res) {
    let sessionTypeID = req.query.id_session_type;
    let query1 = "SELECT * FROM Session_Types WHERE id_session_type = ?";
    db.pool.query(query1, [sessionTypeID], function (error, rows, fields) {
        let session_type = rows;
        res.send({ data: session_type });
    })
})


app.get('/training-session-by-id', function (req, res) {
    let trainingSessionID = parseInt(req.query.id_training_session);
    let query1 = "SELECT * FROM Training_Sessions WHERE id_training_session = ?";
    let query2 = "SELECT * FROM Session_Types"
    db.pool.query(query1, [trainingSessionID], function (error, row, field) {
        let data = row;
        db.pool.query(query2, function (err, rows, fields) {
            let session_types = rows;
            res.send({ data, session_types });
        })
    });
})

// POST ROUTES

// POST Route for inserting new Customer to Customers table
app.post('/add-customer-form', function (req, res) {
    let data = req.body;

    let number_of_dogs_enrolled = parseInt(data['input-dogs-enrolled']);
    if (isNaN(number_of_dogs_enrolled)) {
        number_of_dogs_enrolled = 'NULL'
    }

    let query1 = `INSERT INTO Customers(name, email, phone_number, number_of_dogs_enrolled) 
    VALUES (
            '${data['input-name']}', 
            '${data['input-email']}', 
            '${data['input-phone-number']}', 
            '${number_of_dogs_enrolled}'
            );`

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.redirect('/Customers')
        }
    })
});

app.post('/add-trainer-form', function (req, res) {
    let data = req.body;

    let wage = parseInt(data['input-wage']);
    if (isNaN(wage)) {
        wage = 'NULL'
    }

    let insertQuery = `INSERT INTO Trainers(name, phone_number, email, wages, start_date, preferred_schedule)
    VALUES(
        '${data['input-name']}',
        '${data['input-phone-number']}',
        '${data['input-email']}',
        '${wage}',
        '${data['input-start-date']}',
        '${data['input-preferred-schedule']}'
        );`
    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.redirect('/Trainers')
        }
    })
});

app.post('/add-dog-form', function (req, res) {
    let data = req.body;

    console.log(data);

    let age = parseInt(data['age']);
    if (isNaN(age)) {
        age = 'NULL'
    }

    const vaccinated = data['vaccinated'] == 'Y' ? 1 : 0;

    let insertQuery = `INSERT INTO Dogs(id_customer, fully_vaccinated, temperament, name, age, breed)
    VALUES (
            '${data['id_customer']}', 
            '${vaccinated}', 
            '${data['temperament']}', 
            '${data['dog_name']}',
            '${age}', 
            '${data['breed']}'
            );`

    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.redirect('/Dogs')
        }
    })
});


app.post('/add-training-session', function (req, res) {
    let data = req.body;

    // date format reference:https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
    // validation for date format
    let date = data['date_scheduled'];
    let dateFormat = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/
    if (!dateFormat.test(date)) {
        console.log('invalid date :', date);
        return res.sendStatus(400);
    }

    let insertQuery = `INSERT INTO Training_Sessions(date_scheduled, id_session_type)
    VALUES (
            '${data['date_scheduled']}', 
            '${data['id_session_type']}'
            );`

    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});


app.post('/add-dhts', function (req, res) {
    let data = req.body;

    let dogID = parseInt(data.id_dog)
    let tsID = parseInt(data.id_training_session)

    let insertQuery = `INSERT INTO Dog_Has_Training_Sessions(id_dog, id_training_session, customer_feedback)
    VALUES (
            '${dogID}', 
            '${tsID}',
            '${data['customer_feedback']}'
            );`

    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});

app.post('/add-package-form', function (req, res) {
    let data = req.body;
    let package_sessions = parseInt(data.package_sessions)

    let insertQuery = `INSERT INTO Packages(id_session_type, package_sessions, sale_price)
    VALUES (
            '${data['id_session_type']}', 
            '${package_sessions}',
            '${data['sale_price']}'
            );`

    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});


app.post('/add-session-type', function (req, res) {
    let data = req.body;

    let maxCapacity = parseInt(data.max_capacity)
    if (isNaN(maxCapacity)) {
        return res.sendStatus(400);
    }

    let insertQuery = `INSERT INTO Session_Types(id_session_type, max_capacity)
    VALUES (
            '${data['id_session_type']}', 
            '${maxCapacity}'
            );`

    db.pool.query(insertQuery, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});

// DELETE ROUTES

//DELETE Route for deleting Customer from Customer table
app.delete('/delete-customer', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id_customer);
    let deleteCustomers = `DELETE FROM Customers WHERE id_customer = ?`;
    // Run the 1st query
    db.pool.query(deleteCustomers, [customerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.delete('/delete-trainer', function (req, res, next) {
    let data = req.body;
    let trainerID = parseInt(data.id_trainer);
    let deleteTrainer = `DELETE FROM Trainers WHERE id_trainer = ?`;
    
    db.pool.query(deleteTrainer, [trainerID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});
app.delete('/delete-dog', function (req, res, next) {
    let data = req.body;
    let dogID = parseInt(data.id_dog);
    let deleteDog = `DELETE FROM Dogs WHERE id_dog = ?`;
    // Run the 1st query
    db.pool.query(deleteDog, [dogID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(204);
        }
    })
});

app.delete('/delete-training-session', function (req, res, next) {
    let data = req.body;
    let trainingSessionID = parseInt(data.id_training_session);
    let deleteDog = `DELETE FROM Training_Sessions WHERE id_training_session = ?`;
    // Run the 1st query
    db.pool.query(deleteDog, [trainingSessionID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});

app.delete('/delete-dhts', function (req, res, next) {
    let data = req.body;
    let trainingSessionID = parseInt(data.id_training_session)
    if (isNaN(trainingSessionID)) {
        return res.send(400);
    }

    let dogID = parseInt(data.id_dog)
    if (isNaN(dogID)) {
        return res.send(400);
    }

    let updateQuery =
        `DELETE FROM Dog_Has_Training_Sessions WHERE id_training_session = ? AND id_dog = ?;`

    let filter = [trainingSessionID, dogID]

    db.pool.query(updateQuery, filter, function (error, rows, fileds) {
        if (error) {
            // (400: Bad Request)
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(200);
        }
    })
});

app.delete('/delete-package', function (req, res, next) {
    let data = req.body;
    let packageID = parseInt(data.id_package);
    let deleteDog = `DELETE FROM Packages WHERE id_package = ?`;
    db.pool.query(deleteDog, [packageID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});

app.delete('/delete-session-type', function (req, res, next) {
    let data = req.body;
    let sessionTypeID = data.id_session_type;
    let deleteDog = `DELETE FROM Session_Types WHERE id_session_type = ?`;
    db.pool.query(deleteDog, [sessionTypeID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            res.sendStatus(200);
        }
    })
});

// UPDATE (PUT) ROUTES

//PUT Route for updating a Customer in the Customer table
app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let id = parseInt(data.id_customer);
    let dogsEnrolled = parseInt(data.number_of_dogs_enrolled);

    let queryCustomer = `UPDATE Customers SET name = '${data['name']}', email = '${data['email']}', phone_number = '${data['phone_number']}', number_of_dogs_enrolled = ${dogsEnrolled} WHERE id_customer = ${id}`;
    let selectCustomer = `SELECT * FROM Customers WHERE id_customer = ${id}`

    // Run the 1st query
    db.pool.query(queryCustomer, function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If there was no error, we run our second query and return that data so we can use it to update the customer's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectCustomer, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/update-trainer', function (req, res) {
    let data = req.body;
    let trainerID = parseInt(data.id_trainer)

    let queryTrainer = `UPDATE Trainers SET
                            name = '${data['name']}',
                            phone_number = '${data['phone_number']}',
                            email = '${data['email']}',
                            wages = '${data['wages']}',
                            number_of_sessions_taught = '${data['sessions_taught']}',
                            start_date = '${data['start_date']}',
                            preferred_schedule = '${data['preferred_schedule']}'
                        WHERE id_trainer = '${trainerID}'
                        ;`
    
        db.pool.query(queryTrainer, function (error, rows, fileds) {
            if (error) {
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else {
                res.send(rows);
            }
    })
});
app.put('/update-dog', function (req, res) {
    let data = req.body;
    let dogID = parseInt(data.id_dog)
    let customerID = parseInt(data.id_customer)
    const vaccinated = data['vaccinated'] == 'Y' ? 1 : 0;

    let queryDog = `UPDATE Dogs SET 
                        id_customer = '${customerID}', 
                        fully_vaccinated =  '${vaccinated}',
                        temperament = '${data['temperament']}',
                        name = '${data['name']}',
                        age = '${data['age']}',
                        breed = '${data['breed']}'
                    WHERE id_dog = '${dogID}'
                    ;`
    db.pool.query(queryDog, function (error, rows, fileds) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

app.put('/update-training-session', function (req, res) {
    let data = req.body;
    let trainingSessionID = parseInt(data.id_training_session)
    if (isNaN(trainingSessionID)) {
        trainingSessionID = 'NULL'
    }

    // date format reference:https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
    // validation for date format
    let date = data['date_scheduled'];
    let dateFormat = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/
    if (!dateFormat.test(date)) {
        console.log('invalid date :', date);
        return res.sendStatus(400);
    }

    let updateQuery =
        `UPDATE Training_Sessions SET 
    date_scheduled = '${data.date_scheduled}', 
    id_session_type =  '${data.id_session_type}'
    WHERE id_training_session = '${trainingSessionID}'
    ;`
    db.pool.query(updateQuery, function (error, rows, fileds) {
        if (error) {
            // (400: Bad Request)
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

app.put('/update-dhts', function (req, res) {
    let data = req.body;
    let trainingSessionID = parseInt(data.id_training_session)
    if (isNaN(trainingSessionID)) {
        return res.send(400);
    }

    let dogID = parseInt(data.id_dog)
    if (isNaN(dogID)) {
        return res.send(400);
    }

    let updateQuery =
        `UPDATE Dog_Has_Training_Sessions SET 
    customer_feedback = '${data['customer_feedback']}' 
    WHERE id_training_session = ? AND id_dog = ?;`

    let filter = [trainingSessionID, dogID]

    db.pool.query(updateQuery, filter, function (error, rows, fileds) {
        if (error) {
            // (400: Bad Request)
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

app.put('/update-package', function (req, res) {
    let data = req.body;
    let packageID = parseInt(data.id_package)
    if (isNaN(packageID)) {
        return res.send(400);
    }

    let updateQuery =
        `UPDATE Packages SET 
    id_session_type = '${data['id_session_type']}',
    package_sessions = '${data['package_sessions']}',
    sale_price = '${data['sale_price']}' 
    WHERE id_package = ?;`


    db.pool.query(updateQuery, [packageID], function (error, rows, fileds) {
        if (error) {
            // (400: Bad Request)
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    })
});

// LISTENER

app.listen(PORT, function () {
    console.log(`Express started on http://localhost:${PORT}/Index; press Ctrl-C to terminate.`)
});    