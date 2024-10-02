const express=require('express')
const router=express.Router();
const reservationschema=require('../models/reservation');
router.post('/addreservation',(req,res)=>{
    data=req.body;
    Util=new reservationschema(data);
    Util.save()
    .then(
        (savedreservation)=>{
            res.status(200).send(savedreservation)
        }
    ).catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})
router.get('/getall',(req,res)=>{
    reservationschema.find()
    .then(
        (utilisateur)=>{
            res.send(utilisateur);
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
    reservationschema.findByIdAndUpdate({_id : id},newdata)
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
    reservationschema.findByIdAndDelete({ _id:id })
    .then(
        (deletereservation)=>{
            res.send(deletereservation)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})
router.get('/getbyid/:id',(req,res)=>{
    myid=req.params.id;
    reservationschema.findOne({_id: myid})
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
router.get('/getbydate/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const reservations = await reservationschema.find({ date: date });
        res.status(200).send(reservations);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.put('/confirm-reservation/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReservation = await reservationschema.findByIdAndUpdate(id, { confirmed: true }, { new: true });
        res.status(200).send(updatedReservation);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cancel-reservation/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReservation = await reservationschema.findByIdAndUpdate(id, { cancelled: true }, { new: true });
        res.status(200).send(updatedReservation);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.get('/stats/confirmed/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const confirmedReservations = await reservationschema.countDocuments({ date: date, confirmed: true });
        res.status(200).send({ confirmed: confirmedReservations });
    } catch (err) {
        res.status(400).send(err);
    }
});
router.get('/count', async (req, res) => {
    try {
        const count = await reservationschema.countDocuments();
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






module.exports=router;