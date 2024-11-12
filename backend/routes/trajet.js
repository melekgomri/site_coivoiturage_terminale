const express=require('express')
const router=express.Router();
const mongoose = require('mongoose');
const trajetschema=require('../models/trajet');
const reservationSchema=require('../models/reservation')
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

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the trajet
        const deletedTrajet = await trajetschema.findByIdAndDelete(id);

        if (!deletedTrajet) {
            return res.status(404).send({ message: 'Trajet not found' });
        }

        // Delete all reservations related to the deleted trajet
        await reservationSchema.deleteMany({ trajet: id });

        // Send the deleted trajet as a response
        res.status(200).send(deletedTrajet);
    } catch (err) {
        console.error('Error deleting trajet:', err);
        res.status(400).send({ message: 'Error deleting trajet and associated reservations', error: err });
    }
});
router.get('/getbyid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const trajet = await trajetschema.findById(id).populate('conducteur');;
        res.send(trajet);
    } catch (err) {
        res.status(500).send(err);
        console.error(err);
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

// Example with Express.js (Backend)
router.patch('/update/:id', (req, res) => {
    const id = req.params.id;  
    const updatedData = req.body;  
  
    
    trajetschema.updateOne({ _id: id }, updatedData)
      .then(result => {
        res.status(200).json({ message: 'Trajet updated successfully', result });
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to update trajet', error: err });
      });
  });
  
router.get('/count', async (req, res) => {
    try {
        const count = await trajetschema.countDocuments();
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/getall/:userId', (req, res) => {
    const userId = req.params.userId;

    // Fetch all trajets where the conducteur field matches the userId
    trajetschema.find({ conducteur: userId }) 
    .then((trajets) => {
        if (!trajets || trajets.length === 0) {
            return res.status(404).send('No trajets found for this user');
        }
        res.status(200).send(trajets);
    })
    .catch((err) => {
        res.status(500).send({ error: 'Error fetching trajets for this user', details: err });
    });
});





module.exports=router;