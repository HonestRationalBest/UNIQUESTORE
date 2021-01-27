const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require("express-validator")
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Not correct email').isEmail(),
        check('password', 'Password too small, min lenght 6').isLength({ min: 6 }),
        check('name', 'Name is required!').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data!"
                })
            }
            const { email, password, name } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                res.status(400).json({ message: "This user already exist!" })
            } else {

                const hashpassword = await bcrypt.hash(password, 12);

                const user = new User({
                    email,
                    password: hashpassword,
                    name,
                    hasCollections: false
                })
                await user.save()

                res.status(200).json({ message: "User has been created!" })
            }

        } catch (e) {
            res.status(500).json({ message: "Server error" })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Not correct email').isEmail().normalizeEmail(),
        check('password', 'Enter a password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data!"
                })
            }
            const { email, password } = req.body


            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: "User was not found!" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Not valid password!" })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: "1h" }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: "Server error" })
        }
    })


module.exports = router