const express = require('express');
const cors= required('cors');
require('dotenv').config();


const app = express();

const PORT=8080;
app.use(cors());
app.use(express.json());


app.get('/',(req,res) => {
    res.json({message:'Hello from my server'})
});


app.listen(PORT,() =>{
    console.log(`Server listening on ${PORT}`);
});


