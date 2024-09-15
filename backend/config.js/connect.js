const { error } = require('console');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projetcoivoiturage')
    .then(
        ()=>{
            console.log('connected on port 3000');
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )
module.exports=mongoose;