const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = "pat-na1-4f773731-c4ab-48c6-99f3-311ec4aec9c5";
const addUrl = `/update-cobj`;


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
// * Code for Route 1 goes here
app.get('/', async (req, res) => {

    const pets = 'https://api.hubspot.com/crm/v3/objects/p39875114_pets?properties=name&properties=favoritetoy&properties=type';

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(pets, { headers });
        const data = resp.data.results;
        console.log(data);
        res.render('pets', { title: 'Pets | HubSpot APIs', addUrl: addUrl, data });       
    } catch (error) {
        console.error(error);
    }

});




// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {
    // http://localhost:3000/update?email=rick@crowbars.net


    try {
     //   const response = await axios.get(getContact, { headers });
       // const data = response.data;

        // res.json(data);
        res.render('updates', {userEmail: "data.properties.email", favoriteBook: "data.properties.favorite_book"});
        
    } catch(err) {
        console.error(err);
    }
});


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "name": req.body.name,
            "favoritetoy": req.body.favoritetoy,
            "type": req.body.type
        }
    }


    const updateContact = `https://api.hubspot.com/crm/v3/objects/p39875114_pets`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    console.log(update);

    try { 
        await axios.post(updateContact, update, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});



/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));