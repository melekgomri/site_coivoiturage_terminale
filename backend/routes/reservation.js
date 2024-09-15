const express=require('express')
const router=express.Router();
const contact=require('../models/contact');
router.post('/addcontact',(req,res)=>{
    data=req.body;
    Util=new contact(data);
    Util.save()
    .then(
        (savedutilisateur)=>{
            res.status(200).send(savedutilisateur)
        }
    ).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})
router.get('/getall',(req,res)=>{
    contact.find()
    .then(
        (avis)=>{
            res.send(avis);
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
})
router.put('/update/:id',(req,res)=>{
    id=req.params.id;
    newdata=req.body;
    contact.findByIdAndUpdate({_id : id},newdata)
    .then(
        (update)=>{
            res.send(update)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})
router.delete('/delete/:id',(req,res)=>{
    id=req.params.id
    contact.findByIdAndDelete({ _id:id })
    .then(
        (deleteavis)=>{
            res.send(deleteavis)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})






module.exports=router;