require('dotenv/config')
const express = require('express')
const User = require('../modals/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const symbols = require('../validator/symbols')
const removepassword = require('../validator/removepassword')
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()
const fetchuser = require('../middlewares/verifyuser')
// to create a new user
router.post('/create',
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }).custom(value => {
            if (!symbols.name(value)) {
                return Promise.reject('Enter the valid name')
            }
            return true
        }),
        body('phone', 'Please enter the valid phone number').exists().isLength({min:10,max:10}),
        body('pincode', 'Please enter the valid pincode').exists().isNumeric().isLength({min:6,max:6}),
        body('zone', 'Please enter the valid zone').exists(),
        body('password', 'Password must be atleast 8 characters').isString().isLength({ min: 8 }),
    ],
    async (req, res) => {
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({success:false, errors: validationResult(req).array() });
            }

            let user_mail = await User.findOne({ phone: req.body.phone}).select('phone')
            if (user_mail) {
                return res.status(400).send({success : false,error:"Already have a user"})

            }
            const salt = await bcrypt.genSalt(10);
            let hashpass = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name: req.body.name.toUpperCase(),
                phone:req.body.phone,
                pincode:req.body.pincode,
                zone:req.body.zone,
                password: hashpass,
            })
            const data = {
                user: {
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.send({success:true,user:removepassword(user), authtoken })


        } catch (error) {
            console.log(error)
            res.status(404).send({success:false,error:"internal error"})
        }
    })


// login

router.post('/login',
    [
        body('phone', 'Please enter the valid phone number').exists().isMobilePhone(),
        body('password', 'Enter password').exists().isLength({ min: 8 }),
    ],
    async (req, res) => {
        const { phone, password } = req.body
        try {
            let user = await User.findOne({ phone:phone}).select(['name','phone','password'])
            if (!user) {
                return res.status(401).json({success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(401).json({ success : false, error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success:true,user:removepassword(user), authtoken })
        } catch (error) {
            res.status(500).send({success:false,error:"Internal Server Error"});
        }
    })

// get loggedin
router.post('/fetch', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select(['name','phone'])
        if(!user){
            return res.status(401).send({success:false,error:'Please enter the valid token'})
        }
        else{
            res.send({success:true,user:user})
        }
    } catch (error) {
        res.status(500).send({success:false,error:"Internal Server Error"});
    }
})
module.exports = router