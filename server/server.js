const express = require('express');
const cors = require('cors');
const { restart } = require('nodemon');
require('dotenv').config();
const db= require('./db/db-connection');


const app = express();
app.use(cors());


const PORT= process.env.PORT || 5000;




app.get('/api',(req,res) => {
    res.json({message:'Hello from my server'})
});


app.get('/api/contacts', async (req,res) => {
    try{
        const result= await db.query('SELECT * FROM contacts');
        res.status(200).json({
            status: 'sucess',
            results: result.rows.length,
            data:{
                contacts: result.rows,
            },
        });
    } catch(err){
        console.log(err);
    
    }
});

app.listen(PORT,() =>{
    console.log(`Server listening on ${PORT}`);
});


