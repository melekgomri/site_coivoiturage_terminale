const express=require('express');
require('./config.js/connect');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
const utilisateurrouter=require('./routes/utilisateur');  
const tarjetrouter=require('./routes/trajet');
const avisrouter=require('./routes/avis');
const reservationrouter=require('./routes/reservation');
const contactrouter=require('./routes/contact');
app.use('/reservation',reservationrouter);
app.use('/avis',avisrouter);
app.use('/utilisateur',utilisateurrouter); 
app.use('/trajet',tarjetrouter);
app.use('/contact',contactrouter);


app.listen(3000,()=>{
    console.log('work server');
})