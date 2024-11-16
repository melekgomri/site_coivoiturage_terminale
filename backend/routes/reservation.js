const express=require('express')
const router=express.Router();
const mongoose = require('mongoose');
const reservationschema=require('../models/reservation');
const trajetschema = require('../models/trajet');
const User = require('../models/utilisateur'); 
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
router.patch('/confirm-reservation/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid reservation ID' });
        }

        const reservation = await reservationschema.findById(id);
        if (!reservation) {
            return res.status(404).send({ message: 'Reservation not found' });
        }

        const trajet = await trajetschema.findById(reservation.trajet);
        if (!trajet) {
            return res.status(404).send({ message: 'Trajet not found' });
        }

        if (trajet.placedisponible > 0) {
            trajet.placedisponible -= 1;
            await trajet.save();
            reservation.confirmed = true;
            const updatedReservation = await reservation.save();
            res.status(200).send(updatedReservation);
        } else {
            res.status(400).send({ message: 'No available places left on this trajet' });
        }
    } catch (err) {
        console.error('Error confirming reservation:', err); // Log the error
        res.status(400).send({ message: 'Error confirming reservation', error: err });
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



router.get('/covoitureur/:covoitureurId', async (req, res) => {
    try {
        const covoitureurId = req.params.covoitureurId;
        console.log(covoitureurId);
        const reservations = await reservationschema.find({ covoitureur: covoitureurId })
        .populate("passager") 
        .populate("trajet");;
        console.log(reservations)
        res.status(200).send(reservations);
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});
router.get('/passager/:passagerId', async (req,res)=>{
    try {
        const passagerId = req.params.passagerId;
        console.log(passagerId);
        const reservations = await reservationschema.find({ passager: passagerId })
        .populate("covoitureur")
        .populate("trajet");
        console.log(reservations)
        res.status(200).send(reservations); 
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
})


//Annulation de réservation par le passager 
router.put('/annuler/:id/resetStatus', async (req, res) => {
   
        const reservationId = req.params.id;
        const userId = req.body.userId; // Supposons que vous obtenez l'ID de l'utilisateur qui annule
    
        try {
            // Trouvez la réservation par ID
            const reservation = await reservationschema.findById(reservationId);
            if (!reservation) {
                return res.status(404).send('Réservation non trouvée');
            }
    
            // Vérifiez qui est l'utilisateur qui annule la réservation
            if (reservation.passager.toString() === userId) {
                reservation.annuleePar = 'passager'; // Le passager annule
            } else if (reservation.covoitureur.toString() === userId) {
                reservation.annuleePar = 'covoitureur'; // Le covoitureur annule
            }
    
            // Mettez à jour les autres champs
            reservation.cancelled = true;
            reservation.annulee = true;
    
            // Sauvegardez la réservation mise à jour
            const updatedReservation = await reservation.save();
            res.status(200).json(updatedReservation);
        } catch (err) {
            console.error(err);
            res.status(500).send('Erreur du serveur');
        }

    
});


module.exports=router;