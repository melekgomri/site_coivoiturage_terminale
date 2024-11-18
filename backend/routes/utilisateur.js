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
            console.log("user id: " + user._id);
            res.status(200).send({
                _id : user._id,
                token: token,
                isAdmin: user.isAdmin,
                name : user.name,
                lastname : user.lastname,
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
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params; // Destructure id from params

    try {
        const deletedUser = await Utilisateur.findByIdAndDelete(id); // Pass id directly
        
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        
        res.status(200).send({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }
});


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



router.put('/change-password/:id', async (req, res) => {
    const { id } = req.params; // Get user ID from params
    const { oldPassword, newPassword  , confirmNewPassword} = req.body; // Get current and new passwords from the request body

    try {
        const user = await Utilisateur.findOne({_id: id}); 

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Verify the current password
        const isMatch = bcrypt.compareSync(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Current password is incorrect" });
        }

        // Hash the new password
        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error updating password", error: err.message });
    }
});

router.get('/covoitureurs/all', async (req, res) => {
    Utilisateur.find({ isCovoitureur: true }) 
        .then((utilisateurs) => {
            res.status(200).send(utilisateurs); 
        })
        .catch((err) => {
            res.status(500).send({ error: err.message }); 
        });
})




module.exports=router;