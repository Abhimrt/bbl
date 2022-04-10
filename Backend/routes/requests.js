const express = require('express')
const router = express.Router()
const { body, validationResult, param } = require('express-validator');
const fetchadmin = require('../middlewares/verifyadmin')
const fetchdriver = require('../middlewares/verifydriver')
const fetchuser = require('../middlewares/verifyuser')
// const symbols = require('../validator/symbols')
const Requests = require('../modals/Requests')
const User = require('../modals/User')
const Admin = require('../modals/Admin')
const Driver = require('../modals/driver');
// const { promise } = require('bcrypt/promises');

//  All the pending requests of the user


router.get('/pending', fetchuser,
    async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            userId = req.user.id;
            let userphone = await User.findById(userId).select('id')
            if (!userphone) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            let zoneRequest = await Requests.find({ user: req.user.id })
            if (!zoneRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, Request: zoneRequest })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })



//       Api for all the requests



router.get('/all', fetchadmin, async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(401).send({ success: false, error: 'please login' })
        }
        adminId = req.admin.id;
        finaluser = await Admin.findById(adminId)
        if (!finaluser) {
            return res.status(401).send({ success: false, error: 'please login' })
        }
        let allRequest = await Requests.find()
        if (!allRequest) {
            return res.status(204).send({ success: false, error: 'No reqes found' })
        }
        else {
            res.send({ success: true, Request: allRequest })
        }
    }
    catch (error) {
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
})


// See all the Request in pincode/zone


router.get('/:pincode/:zone', fetchadmin, fetchdriver,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric(),
        param('zone', 'Please enter the zone').exists()
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() })
        }
        try {
            let finaluser = null
            if (req.admin) {
                adminId = req.admin.id;
                finaluser = await Admin.findById(adminId)
            }
            else {
                if (req.driver) {
                    driverId = req.driver.id;
                    finaluser = await Driver.findById(driverId)
                }
            }
            if (!req.admin && !req.driver) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please signup' })
            }
            let zoneRequest = await Requests.find({
                pincode: req.params.pincode,
                zone: req.params.zone.toUpperCase()
            })
            if (!zoneRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, Request: zoneRequest })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })


// See all the requests in pincode/zone/date


router.get('/:pincode/:zone/:date', fetchadmin, fetchdriver,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric().isLength({ min: 6, max: 6 }),
        param('zone', 'Please enter the valid pincode').exists(),
        param('date', 'Please enter the valid pincode').exists(),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() })
        }
        try {
            let finaluser = null
            if (req.admin) {
                adminId = req.admin.id;
                finaluser = await Admin.findById(adminId)
            }
            else {
                if (req.driver) {
                    driverId = req.driver.id;
                    finaluser = await Driver.findById(driverId)
                }
            }
            if (!req.admin && !req.driver) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please signup' })
            }
            let pincodeRequest = await Requests.find({
                pincode: req.params.pincode,
                zone: req.params.zone.toUpperCase(),
                date: req.params.date,

            })
            if (!pincodeRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, Request: pincodeRequest })
            }

        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })


// search requets with pincode/zone/date/time


router.get('/:pincode/:zone/:date/:time', fetchadmin, fetchdriver,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric().isLength({ min: 6, max: 6 }),
        param('zone', 'Please enter the valid pincode').exists(),
        param('date', 'Please enter the valid pincode').exists(),
        param('time', 'Please enter the valid pincode').exists(),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() })
        }
        try {
            let finaluser = null
            if (req.admin) {
                adminId = req.admin.id;
                finaluser = await Admin.findById(adminId)
            }
            else {
                if (req.driver) {
                    driverId = req.driver.id;
                    finaluser = await Driver.findById(driverId)
                }
            }
            if (!req.admin && !req.driver) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please signup' })
            }
            let pincodeRequest = await Requests.find({
                pincode: req.params.pincode,
                zone: req.params.zone.toUpperCase(),
                date: req.params.date,
                time: req.params.time,

            })
            if (!pincodeRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, Request: pincodeRequest })
            }

        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })


//   Api for adding the request


router.post('/add', fetchuser,
    [
        body('time', 'Please enter the time').exists(),
        body('date', 'Please enter the date').exists(),
        body('wasteType', 'Please enter the waste type').exists(),
        body('amount', 'Please enter the amount').exists().isNumeric().isLength({ max: 2 }),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            console.log(validationResult(req).array())
            return res.status(400).json({ success: false, errors: validationResult(req).array() })
        }
        try {
            let { time, date, wasteType, amount } = Requests(req.body)
            if (!req.user) {
                return res.status(401).send({ success: false, error: 'Please login' })
            }
            let finaluser = await User.findById(req.user.id).select(['pincode', 'zone'])
            if (!finaluser) {
                return res.status(401).send({ success: false, error: "User dosn't exists" })
            }
            let existsRequest = await Requests.findOne({
                user: req.user.id,
                time: time,
                date: date,
                wasteType: wasteType.toUpperCase(),
                amount: amount,
                pincode: finaluser.pincode,
                zone: finaluser.zone.toUpperCase()
            })
            if (existsRequest) {
                return res.status(409).send({ success: false, error: "Already request exists" })
            }
            let newRequest = await Requests.create({
                user: req.user.id,
                time: time,
                date: date,
                wasteType: wasteType.toUpperCase(),
                pincode: finaluser.pincode,
                amount: amount,
                zone: finaluser.zone.toUpperCase()
            })
            if (!newRequest) {
                return res.status(400).send({ success: false, error: 'Request not created' })
            }
            else {
                res.send({ success: true, Request: newRequest })
            }
        } catch (error) {
            console.log(error)
            res.status(404).send({ success: false, error: "internal error" })
        }
    })


//       Api for editing the content of the requests


router.post('/edited/:id', fetchuser,
    [
        body('time'),
        body("date"),
        body('wasteType'),
        body('amount'),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success: false, errors: validationResult(req).array() })
        }
        try {
            if (!req.user) {
                return res.status(401).send({ success: false, error: 'Please login' })
            }
            let finaluser = await User.findById(req.user.id).select('id')
            if (!finaluser) {
                return res.status(401).send({ success: false, error: "User dosn't exists" })
            }
            let request = await Requests.findById(req.params.id)
            if (!request) {
                return res.status(400).send({ success: false, error: 'request doesnot exists' })
            }
            const newRequest = {}
            if (req.body.time) { newRequest.time = req.body.time }
            if (req.body.date) { newRequest.date = req.body.date }
            if (req.body.wasteType) { newRequest.wasteType = req.body.wasteType.toUpperCase() }
            if (req.body.amount) { newRequest.amount = req.body.amount }
            let data = await Requests.findByIdAndUpdate(req.params.id, { $set: newRequest }, { new: true })
            if (!data) {
                return res.status(401).send({ success: false, error: 'Request not updated' })
            }
            else {
                res.send({ success: true, Request: data })
            }
        } catch (error) {
            console.error({ error })
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })

//  Api for Deleting the Request


router.delete('/delete/:id', fetchadmin, fetchuser, fetchdriver, async (req, res) => {
    try {
        let finaluser = null
        if (req.admin) {
            adminId = req.admin.id;
            finaluser = await Admin.findById(adminId)
        }
        else {
            if (req.driver) {
                driverId = req.driver.id;
                finaluser = await Driver.findById(driverId)
            }
            if (req.user) {
                userId = req.user.id;
                finaluser = await User.findById(userId)
            }
            if (!req.admin && !req.driver && !req.user) {
                return res.status(401).send({ success: false, error: 'please login' })
            }
            if (!finaluser) {
                return res.status(401).send({ success: false, error: 'please signup' })
            }
        }
        let request = await Requests.findById(req.params.id)
        if (!request) {
            return res.status(400).send({ success: false, error: "request doesn't exists" })
        }
        request = await Requests.findByIdAndDelete(req.params.id)
        if (!request) {
            return res.status(400).send({ success: false, error: 'Request Deletion Unsuccessfully' })
        }
        else {
            res.send({ success: true, Request: request })
        }
    } catch (error) {
        console.error({ error })
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
})
module.exports = router