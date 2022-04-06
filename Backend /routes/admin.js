require('dotenv/config')
const express = require('express')
const Admin = require('../modals/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const removepassword = require('../validator/removepassword')
const JWT_SECRET = process.env.JWT_SECRET
const router = express.Router()
const fetchadmin = require('../middlewares/verifyadmin')
// login

router.post('/login',
    [
        body('email', 'Please enter the valid email').exists().isEmail(),
        body('password', 'Enter password').exists().isLength({ min: 8 }),
    ],
    async (req, res) => {
        const { email, password } = req.body
        try {
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ success: false, errors: validationResult(req).array() });
            }
            let admin = await Admin.findOne({ email }).select(['_id','name','email','password'])
            if (!admin) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, admin.password);
            if (!passwordCompare) {
                return res.status(401).json({ success: false, error: "Please try to login with correct credentials" });
            }
            const data = {
                admin: {
                    id: admin.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success: true,user:removepassword(admin), authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send({ success: false, error: "Internal Server Error" });
        }
    })

// get loggedin
router.post('/fetch', fetchadmin, async (req, res) => {
    try {
        if (!req.admin) {
            return res.status(401).send({ success: false, error: 'Please enter the valid token1' })
        }
        console.log(req.admin)
        console.log(req.admin.id)
        const admin = await Admin.findById(req.admin.id).select(['name','email'])
        if (!admin) {
            return res.status(401).send({ success: false,admin, error: 'Please enter the valid token2' })
        }
        else {
            res.send({ success: true, user:admin })
        }
    } catch (error) {
        res.status(500).send({ success: false, error: "Internal Server Error" });
        console.error(error)
    }
})
module.exports = router