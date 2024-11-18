const express=require('express')
const router=express.Router();
const avisschema=require('../models/avis');
router.post('/addavis',(req,res)=>{
    data=req.body;
    Util=new avisschema(data);
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
router.get('/getbyid/:id',(req,res)=>{
    myid=req.params.id;
    avisschema.findOne({_id: myid})
    .then(
        (user)=>{
            res.send(user);
        }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
})
router.get('/count/:covoitureurId', async (req, res) => {
    try {
        const covoitureurId = req.params.covoitureurId;
        const count = await avisschema.countDocuments({ covoitureur: covoitureurId });
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/reviews/:covoitureurId', async (req, res) => {
    try {
        const covoitureurId = req.params.covoitureurId; 
        const reviews = await avisschema.find({ covoitureur: covoitureurId })
        .populate('auteur', 'name lastname')  // Populate the 'auteur' field (assumes 'auteur' is a reference to 'Utilisateur')
            .populate('covoitureur', 'lastname'); ; 
        res.status(200).json(reviews); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getall',(req,res)=>{
    avisschema.find()
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
    avisschema.findByIdAndUpdate({_id : id},newdata)
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
    avisschema.findByIdAndDelete({ _id:id })
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