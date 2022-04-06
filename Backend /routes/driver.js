require('dotenv/config')
const express = require('express')
const Driver = require('../modals/driver')
const Admin = require('../modals/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const symbols = require('../validator/symbols')
const removepassword = require('../validator/removepassword')
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()
const fetchdriver = require('../middlewares/verifydriver')
const fetchadmin = require('../middlewares/verifyadmin')
// to create a new driver
router.post('/create', fetchadmin,
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }).custom(value => {
            if (!symbols.name(value)) {
                return Promise.reject('Enter the valid name')
            }
            return true
        }),
        body('truckID', 'Please enter the valid truckID').isLength({min:9,max:10}).custom(value=>{
            if(!symbols.truck(value)){
                return Promise.reject('Enter the valid truck id')
            }
            return true
        }),
        body('password', 'password must be atleast 6 characters').isString().isLength({ min: 6,max:6 }),
    ],
    async (req, res) => {
        let driver = Driver(req.body)
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ success: false, errors: validationResult(req).array() });
            }
            if (!req.admin) {
                return res.status(401).send({ success: false, error: 'Please Authenticate' })
            }
            else {
                let verifyadmin = await Admin.findById(req.admin.id).select('id')
                if (!verifyadmin) {
                    return res.status(401).send({ success: false, error: 'Please Authenticate' })
                }
                let driver_mail = await Driver.findOne({ truckID: driver.truckID.toUpperCase() }).select('truckID')
                if (driver_mail) {
                    return res.status(401).send({ success: false, error: "Already have a driver" })

                }
                const salt = await bcrypt.genSalt(10);
                let hashpass = await bcrypt.hash(driver.password, salt);
                driver = await Driver.create({
                    name: req.body.name.toUpperCase(),
                    truckID: req.body.truckID.toUpperCase(),
                    password: hashpass,
                })
                const data = {
                    driver: {
                        truckID: driver._id
                    }
                }
                const authtoken = jwt.sign(data, JWT_SECRET);
                res.send({ success: true, user: removepassword(driver), authtoken })

            }
        } catch (error) {
            res.status(404).send({ success: false, error: "Internal Server Error" })
            console.error(error)
        }
    })


// login

router.post('/login',
    [
        body('truckID', 'Please enter the valid truckID').isLength({min:9,max:10}).custom(value=>{
            if(!symbols.truck(value)){
                return Promise.reject('Enter the valid truck id')
            }
            return true
        }),
        body('password', 'Enter password').exists().isLength({ min: 6,max:6 }),
    ],
    async (req, res) => {
        const { truckID, password } = req.body
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ success: false, errors: validationResult(req).array() });
            }
            let driver = await Driver.findOne({ truckID:truckID.toUpperCase() }).select(['name','truckID','password'])
            if (!driver) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, driver.password);
            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                driver: {
                    truckID: driver._id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, user: removepassword(driver), authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })

// get loggedin
router.post('/fetch', fetchdriver, async (req, res) => {
    try {
        if (!req.driver) {
            return res.status(401).send({ success: false, error: 'Please enter the valid token' })
        }
        let driverId = req.driver.truckID;
        const driver = await Driver.findById(driverId).select(['name','truckID'])
        if (!driver) {
            return res.status(401).send({ success: false, error: 'Please enter the valid token' })
        }
        else {
            res.send({ success: true, user: driver })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
        console.error(error)
    }
})
module.exports = router