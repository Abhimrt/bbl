require('dotenv/config')
const express = require('express')
const Driver = require('../modals/driver')
const Admin = require('../modals/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult, param } = require('express-validator');
const symbols = require('../validator/symbols')
const removepassword = require('../validator/removepassword')
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()
const fetchdriver = require('../middlewares/verifydriver')
const fetchadmin = require('../middlewares/verifyadmin')
const Request = require('../modals/Requests')


// to create a new driver


router.post('/create', fetchadmin,
    [
        body('zone', 'Enter a valid name').isLength({ min: 5 }).custom(value => {
            if (!symbols.name(value)) {
                return Promise.reject('Enter the valid name')
            }
            return true
        }),
        body('pincode', 'Enter a valid pincode').isLength({ min: 6, max: 6 }).isNumeric(),
        body('truckID', 'Please enter the valid truckID').isLength({ min: 9, max: 10 }).custom(value => {
            if (!symbols.truck(value)) {
                return Promise.reject('Enter the valid truck id')
            }
            return true
        }),
        body('password', 'password must be atleast 6 characters').isString().isLength({ min: 6, max: 6 }),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success: false, errors: validationResult(req).array() });
        }
        try {
            let driver = Driver(req.body)
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
                    zone: req.body.zone.toUpperCase(),
                    pincode: req.body.pincode,
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
        }
    })


// login

router.post('/login',
    [
        body('truckID', 'Please enter the valid truckID').isLength({ min: 9, max: 10 }).custom(value => {
            if (!symbols.truck(value)) {
                return Promise.reject('Enter the valid truck id')
            }
            return true
        }),
        body('password', 'Enter password').exists().isLength({ min: 6, max: 6 }),
    ],
    async (req, res) => {
        try {
            const { truckID, password } = req.body
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ success: false, errors: validationResult(req).array() });
            }
            let driver = await Driver.findOne({ truckID: truckID.toUpperCase() })
            if (!driver) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, driver.password);
            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                driver: {
                    id: driver._id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true, user: removepassword(driver), authtoken })

        } catch (error) {
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
        const driver = await Driver.findById(driverId)
        if (!driver) {
            return res.status(401).send({ success: false, error: 'Please enter the valid token' })
        }
        else {
            res.send({ success: true, user: removepassword(driver) })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
})


// See all the drivers



router.get('/all', fetchadmin, async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(401).send({ success: false, error: 'please login' })
        }
        adminId = req.admin.id;
        let finaluser = await Admin.findById(adminId)
        if (!finaluser) {
            return res.status(401).send({ success: false, error: 'please login' })
        }
        let allRequest = await Driver.find()
        if (!allRequest) {
            return res.status(204).send({ success: false, error: 'No reqes found' })
        }
        else {
            res.send({ success: true, Request: allRequest })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
})


router.get('/requests/all', fetchdriver, async (req, res) => {
        try {
            if (!req.driver) {
                return res.status(401).send({ success: false, error: 'please login1' })
            }
            adminId = req.driver.id;
            let finaluser = await Driver.findById(adminId)
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please login2' })
            }
            let d = new Date()
            let dd = d.getDate()
            let dm = d.getMonth()+1
            let dt = d.getHours()
            let finaltime = symbols.slot(dt)
            let allRequest = await Request.find({
                pincode: finaluser.pincode,
                zone: finaluser.zone.toUpperCase(),
                date: `${dd}-${dm}`,
                time : finaltime
            })
            if (!allRequest) {
                return res.status(204).send({ success: false, error: 'No reqes found' })
            }
            else {
                res.send({ success: true, Request: allRequest })
            }
        } catch (error) {
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })


//  See all the drivers in pincode/zone


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
            let allRequest = await Driver.find({
                pincode: req.params.pincode,
                zone: req.params.zone.toUpperCase()
            })
            if (!allRequest) {
                return res.status(204).send({ success: false, error: 'No reqes found' })
            }
            else {
                res.send({ success: true, Request: allRequest })
            }
        } catch (error) {
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })





module.exports = router