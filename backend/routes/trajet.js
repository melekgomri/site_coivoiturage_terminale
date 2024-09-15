const express=require('express')
const router=express.Router();
const trajetschema=require('../models/trajet');
router.post('/addtrajet',(req,res)=>{
    data=req.body;
    traj=new trajetschema(data);
    traj.save()
    .then(
        (savedtrajet)=>{
            res.status(200).send(savedtrajet)
        }
    ).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})
router.delete('/delete/:id',(req,res)=>{
    id=req.params.id
    trajetschema.findByIdAndDelete({ _id:id })
    .then(
        (deletetrajet)=>{
            res.send(deletetrajet)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})
router.get('/getbyid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const trajet = await trajetschema.findById(id);
        res.send(trajet);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getall',(req,res)=>{
    trajetschema.find()
    .then(
        (trajet)=>{
            res.send(trajet);
        }
    ).catch(
        (err)=>{
            res.send(err)
        }
    )
}) 
router.get('/places',(req,res)=>{
    trajetschema.find({},'place')
    .then((places)=>{
        res.send(places.map(place=>place.place));
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});

router.put('/update/:id',(req,res)=>{
    id=req.params.id;
    newdata=req.body;
    trajetschema.findByIdAndUpdate({_id : id},newdata)
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
router.get('/count', async (req, res) => {
    try {
        const count = await trajetschema.countDocuments();
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports=router;