const express = require('express')
const router = express.Router()
const { body, validationResult, param, oneOf } = require('express-validator');
const fetchadmin = require('../middlewares/verifyadmin')
const fetchdriver = require('../middlewares/verifydriver')
const fetchuser = require('../middlewares/verifyuser')
const symbols = require('../validator/symbols')
const Requests = require('../modals/Requests')
const User = require('../modals/User')
const Admin = require('../modals/Admin')
const Driver = require('../modals/driver');
// const { promise } = require('bcrypt/promises');



router.get('/pending', fetchuser,
    async (req, res) => {
        try {
            userId = req.user.id;
            console.log('abhinav')
            let userphone = await User.findById(userId).select(['name','phone'])
            if(!userphone){
                return res.status(401).send({ success: false, error: 'please login' })
            }
            let zoneRequest = await Requests.find({user:req.user.id})
            if (!zoneRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, zoneRequest })
            }

        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })
//       Api for all the requests



router.get('/all', fetchadmin, async (req, res) => {
    let finaluser = null
    // if (req.admin) {
    adminId = req.admin.id;
    finaluser = await Admin.findById(adminId)
    // }
    // else {
    //     if (req.driver) {
    //         driverId = req.driver.id;
    //         finaluser = await Driver.findById(driverId)
    //     }
    //     if (req.user) {
    //         userId = req.user.id;
    //         finaluser = await User.findById(userId)
    //     }
    // }
    // if (!req.admin && !req.user&&!req.driver) {
    //     return res.status(401).send({success:false,error:'please login'})
    // }
    if (!req.admin) {
        return res.status(401).send({ success: false, error: 'please login' })
    }
    // if (!finaluser) {
    //     return res.status(401).send({success:false,error:'please signup'})
    // }
    let allRequest = await Requests.find()
    if (!allRequest) {
        return res.status(204).send({ success: false, error: 'No reqes found' })
    }
    else {
        res.send({ success: true, allRequest })
    }
})


// Api for BrancWise Search


router.get('/:pincode', fetchadmin, fetchdriver,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric().isLength({min:6,max:6}),
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() })
        }
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
        try {
            let pincodeRequest = await Requests.find({ pincode: req.params.pincode.toUpperCase() })
            if (!pincodeRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, pincodeRequest })
            }

        } catch (error) {
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })


// Api for zoneWise searching


router.get('/:pincode/:zone', fetchadmin, fetchdriver,
    [
        param('pincode', 'Please enter the valid pincode').isNumeric(),
        param('zone', 'Please enter the zone').isLength({ min: 5 })
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() })
        }
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
        try {
            let zoneRequest = await Requests.find({ pincode: req.params.pincode, zone: req.params.zone.toUpperCase() })
            if (!zoneRequest) {
                return res.status(401).send({ success: false, error: 'No request found' })
            }
            else {
                res.send({ success: true, zoneRequest })
            }

        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })

    // Searching requests of the user


//   Api for adding the boooks


router.post('/add', fetchuser,
    [
        body('user', 'Please enter the customer id').exists(),
        body('time', 'Please enter the valid time').exists(),
        body('date', 'Please enter the valid date').exists(),
        body('wasteType', 'Please enter the valid waste type').exists(),
        body("zone", 'Please enter the valid zone').exists(),
        body('pincode', 'Please enter the valid pincode').exists().isNumeric()
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success: false, errors: validationResult(req).array() })
        }
        try {
            let request = Requests(req.body)
            if(!req.user){
                return res.status(401).send({success:false,error:'Please login'})
            }
            let finaluser = await User.findById(request.user)
            let existsRequest = await Requests.findOne({
                user:request.user,
                time:request.time,
                date:request.date,
                wasteType:request.wasteType.toUpperCase(),
                pincode:request.pincode,
                zone:request.zone.toUpperCase()
            })
            if(!finaluser){
                return res.status(204).send({ success: false, error: "User dosn't exists" })
            }
            if (existsRequest) {
                return res.status(409).send({ success: false, error: "Already request exists" })
            }
            let newRequest = await Requests.create({
                user:request.user,
                time:request.time,
                date:request.date,
                wasteType:request.wasteType.toUpperCase(),
                pincode:request.pincode,
                zone:request.zone.toUpperCase()
            })
            if (!newRequest) {
                return res.status(400).send({ success: false, error: 'Request not created' })
            }
            else {
                res.send({ success: true, newRequest })
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
        body("date" ),
        body('wasteType'),
        body('pincode'),
        body('zone')
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ success: false, errors: validationResult(req).array() })
        }
        try {
            let request = await Requests.findById(req.params.id)
            if (!request) {
                return res.status(400).send({ success: false, error: 'request doesnot exists' })
            }
            const newRequest = {}
            if (req.body.time) { newRequest.time = req.body.time}
            if (req.body.date) { newRequest.date = req.body.date }
            if (req.body.wasteType) { newRequest.wasteType = req.body.wasteType.toUpperCase() }
            if (req.body.pincode) { newRequest.pincode = req.body.pincode }
            if (req.body.zone) { newRequest.zone = req.body.zone.toUpperCase() }
            let data = await Requests.findByIdAndUpdate(req.params.id, { $set: newRequest }, { new: true })
            if (!data) {
                return res.status(401).send({ success: false, error: 'Request not updated' })
            }
            else {
                res.send({ success: true, data })
            }
        } catch (error) {
            console.error({ error })
            res.status(500).send({ success: false, error: 'Internal server error' })
        }
    })

//  Api for Deleting the Request


router.delete('/delete/:id', fetchadmin,fetchuser, fetchdriver, async (req, res) => {
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
        if (!req.admin && !req.driver && ! req.user) {
            return res.status(401).send({ success: false, error: 'please login' })
        }
        if (!finaluser) {
            return res.status(401).send({ success: false, error: 'please signup' })
        }
    }
    try {
        let request = await Requests.findById(req.params.id)
        if (!request) {
            return res.status(400).send({ success: false, error: "request doesn't exists" })
        }
        request = await Requests.findByIdAndDelete(req.params.id)
        if (!request) {
            return res.status(400).send({ success: false, error: 'Request Deletion Unsuccessfully' })
        }
        else {
            res.send({ success: true, request })
        }
    } catch (error) {
        console.error({ error })
        res.status(500).send({ success: false, error: 'Internal server error' })
    }
})
module.exports = router