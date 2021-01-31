const { Router } = require('express')
const User = require('../models/User')
const { cloudinary } = require('../utils/cloudinary');
const router = Router()
const { check, validationResult } = require("express-validator");
const Collections = require('../models/Collections');
const Items = require('../models/Items');


router.post("/add_item_to_cloudinary", [
    check('name', 'Name is required!').isLength({ min: 1 })
], async (req, res) => {
    try {
        const img = req.body.img
        const id = req.body.id
        const name = req.body.name
        const tegs = req.body.tegs

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data!"
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });

        res.json({ msg: 'Successfully adding!' });
        const item = new Items({
            collectionId: id,
            name,
            tegs,
            img: uploadResponse.url,
            likesCount: 0
        })
        await item.save()

        res.status(200).json({ message: "Item has been created!" })

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
})


router.post("/add_collection_to_cloudinary", [
    check('name', 'Name is required!').isLength({ min: 1 })
], async (req, res) => {
    try {
        const img = req.body.img
        const id = req.body.id
        const name = req.body.name
        const date = req.body.date

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data!"
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });

        res.json({ msg: 'Successfully adding!' });
        const collection = new Collections({
            ownerId: id,
            name,
            date,
            img: uploadResponse.url
        })
        await collection.save()

        res.status(200).json({ message: "Collection has been created!" })

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
})


router.post("/add_avatar_to_cloudinary",
    async (req, res) => {
        try {
            const id = req.body.id
            const img = req.body.img

            const uploadResponse = await cloudinary.uploader.upload(img, {
                upload_preset: 'dev_setups',
            });
            res.json({ msg: 'Successfully adding!' });

            User.updateOne({ _id: id }, { img: uploadResponse.url }, async (err, users) => {
                mongoose.disconnect();
                if (err) return console.log(err);
                return res.send(users)
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ err: 'Something went wrong' });
        }
    })


module.exports = router