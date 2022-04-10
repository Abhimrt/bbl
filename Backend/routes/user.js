require('dotenv/config')
const express = require('express')
const User = require('../modals/User')
const Admin = require('../modals/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const symbols = require('../validator/symbols')
const removepassword = require('../validator/removepassword')
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()
const fetchuser = require('../middlewares/verifyuser')
const fetchadmin = require('../middlewares/verifyadmin')

// See all the users

router.get('/all', fetchadmin, async (req, res) => {
    if (!req.admin) {
        return res.status(401).send({ success: false, error: 'please login' })
    }
    adminId = req.admin.id;
    let finaluser = await Admin.findById(adminId)
    if (!finaluser) {
        return res.status(401).send({ success: false, error: 'please login' })
    }
    let allRequest = await User.find()
    if (!allRequest) {
        return res.status(204).send({ success: false, error: 'No reqes found' })
    }
    else {
        res.send({ success: true, Request: removepassword(allRequest) })
    }
})


// to create a new user
router.post('/create',
    [
        body('name', 'Enter a valid name').exists().custom(value => {
            if (!symbols.name(value)) {
                return Promise.reject('Enter the valid name')
            }
            return true
        }),
        body('phone', 'Please enter the valid phone number').exists().isLength({ min: 10, max: 10 }),
        body('pincode', 'Please enter the valid pincode').exists().isNumeric().isLength({ min: 6, max: 6 }),
        body('zone', 'Please enter the zone').exists(),
        body('latitude', 'Please enter the latitude').exists(),
        body('longitude', 'Please enter the  longitude').exists(),
        body('password', 'Password must be atleast 8 characters').isString().isLength({ min: 8 }),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success: false, errors: validationResult(req).array() });
        }
        try {
            let user_mail = await User.findOne({ phone: req.body.phone }).select('phone')
            if (user_mail) {
                return res.status(400).send({ success: false, error: "Already have a user" })
            }
            const salt = await bcrypt.genSalt(10);
            let hashpass = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name: req.body.name.toUpperCase(),
                phone: req.body.phone,
                pincode: req.body.pincode,
                zone: req.body.zone.toUpperCase(),
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                password: hashpass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.send({ success: true, user: removepassword(user), authtoken })


        } catch (error) {
            console.log(error)
            res.status(404).send({ success: false, error: "internal error" })
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
            let user = await User.findOne({ phone: phone })
            if (!user) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, user: removepassword(user), authtoken })
        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })

// get loggedin

router.post('/fetch', fetchuser, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ success: false, error: "Please authentiate with correct crediantials" })
        }
        userId = req.user.id;
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).send({ success: false, error: 'Please enter the valid token' })
        }
        else {
            res.send({ success: true, user: removepassword(user) })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
})

// See all the users in pincode/zone


router.get('/:pincode/:zone', fetchadmin,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric(),
        param('zone', 'Please enter the zone').exists()
    ],
    async (req, res) => {
        try {
            if (!req.admin) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            adminId = req.admin.id;
            let finaluser = await Admin.findById(adminId)
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            let allRequest = await User.find({
                pincode: req.params.pincode,
                zone: req.params.zone.toUpperCase()
            })
            if (!allRequest) {
                return res.status(204).send({ success: false, error: 'No reqes found' })
            }
            else {
                res.send({ success: true, allRequest })
            }
        } catch (error) {
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })



module.exports = router