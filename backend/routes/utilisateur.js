const express=require('express')
const router=express.Router();
const Utilisateur=require('../models/utilisateur');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/register',async (req,res)=>{
    const data = req.body;
    const user = new Utilisateur(data);
    const salt = bcrypt.genSaltSync(10);
    const cryptepass = await bcrypt.hashSync(data.password, salt);
    user.password = cryptepass;
    try {
        const saved = await user.save();
        res.status(200).send(saved);
    } catch (err) {
        res.status(400).send(err);
    }
})
router.post('/login', async (req, res) => {
    const data = req.body;
    const user = await Utilisateur.findOne({ email: data.email });

    if (!user) {
        res.status(404).send('Email or password invalid!');
    } else {
        const validPassword = bcrypt.compareSync(data.password, user.password);
        if (!validPassword) {
            res.status(401).send('Email or password invalid!');
        } else {
            let role = 'user'; // Par défaut, rôle utilisateur
            if (user.isAdmin) {
                role = 'admin';
            } else if (user.isCovoitureur) {
                role = 'covoitureur';
            }

            const payload = {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: role 
            };

            const token = jwt.sign(payload, 'your_secret_key'); // Utilisez votre propre clé secrète
            res.status(200).send({
                token: token,
                isAdmin: user.isAdmin,
                isCovoitureur: user.isCovoitureur
            });        }
    }
});
router.get('/count', async (req, res) => {
    try {
        const count = await Utilisateur.countDocuments();
        res.status(200).json({ count: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/getall',(req,res)=>{
    Utilisateur.find()
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
    Utilisateur.findByIdAndUpdate({_id : id},newdata)
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
    Utilisateur.findByIdAndDelete({ _id:id })
    .then(
        (deleteuser)=>{
            res.send(deleteuser)
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
    Utilisateur.findOne({_id: myid})
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






module.exports=router;