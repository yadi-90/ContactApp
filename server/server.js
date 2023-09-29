const express = require('express');
const cors = require('cors');
const { restart } = require('nodemon');
require('dotenv').config();
const db= require('./db/db-connection');


const app = express();
app.use(cors());
app.use(express.json());

const PORT= process.env.PORT || 5000;




app.get('/',(req,res) => {
    res.json({message:'Hello from my server'})
});


// create the get request for students in the endpoint '/api/students'
app.get("/api/contacts", async (req, res) => {
    try {
    const { rows: contacts } = await db.query("SELECT * FROM contacts");
     res.send(contacts);
    } catch (e) {
    return res.status(400).json({ e });
     }
    });
    
    // create the POST request
    app.post("/api/contact", async (req, res) => {
     try {
     const newContact = {
     name: req.body.name,
     phone: req.body.phone,
     email: req.body.email,
    birthday: req.body.birthday,
     };
     console.log(req.body);
     const result = await db.query(
     "INSERT INTO contacts (name, phone, email, birthday) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [
     newContact.name,
    
    newContact.phone,
     newContact.email,
     newContact.birthday,
     ]
     );
    console.log(result.rows[0]);
     res.json(result.rows[0]);
     } catch (e) {
     console.log(e);
     return res.status(400).json({ e });
     }
    });
    
    // delete request for contacts
    app.delete("/api/contact/:contactId", async (req, res) => {
     try {
     console.log(req.params);
     const contactId = req.params.contactId;
     await db.query("DELETE FROM contacts WHERE contact_id=$1", [contactId]);
     console.log("From the delete request-url", contactId);
     res.status(200).end();
     } catch (e) {
     console.log(e);
     return res.status(400).json({ e });
     }
    });
    
    //A put request - Update a contact
    app.put("/api/contact/:contactId", async (req, res) => {
     console.log(req.body);
    //console.log(req.params);
     //This will be the id that I want to find in the DB - the student to be updated
    const contactId = req.params.contactId;
    const { name, phone, email, birthday } = req.body;
    console.log("In the server from the url - the contact id", contactId);
    console.log(
     "In the server, from the react - the contact to be edited",
    req.body
     );
// UPDATE students SET lastname = "something" WHERE id="16";
 const query = `UPDATE contacts SET firstname=$1, lastname=$2, phone=$3, email=$4, notes=$5 WHERE contact_id=${contactId} RETURNING *`;
 const values = [firstname, lastname, phone, email, notes];
try {
 const updated = await db.query(query, values);
 console.log(updated.rows[0]);
 res.send(updated.rows[0]);
} catch (e) {
 console.log(e);
 return res.status(400).json({ e });
 }
});

app.listen(PORT,() =>{
    console.log(`Server listening on ${PORT}`);
});