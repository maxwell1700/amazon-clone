const functions = require("firebase-functions");
const express = require('express');

const cors = require('cors');
const stripe = require('stripe')('sk_test_51J3PzZK0Y0lJuG2eXRUnSpbiXQutFh0zwcw9x5f993xgM1CpR071EVFCoEVxr0sJAM5qJkAz7DZoadJTPWYKY1QC003QLGQ4oo');

// app config 
const app = express();


//middleware

app.use(cors());
app.use(express.json());

//api routes
app.get('/', (req, res) => res.status(200).send('hello world')) // test the api call to the servers

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log('payment req received!!!! FOR THIS AMOUNT >>> ', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//listen command

exports.api = functions.https.onRequest(app);

// function folder is the separate backend part of the full stack so make sure you in the right directory

// deploy the functions the same way you host firebase only functions then grab the function link from firebase functions tab

