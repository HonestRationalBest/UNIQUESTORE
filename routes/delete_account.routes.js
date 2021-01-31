const { Router } = require('express');
const Collections = require('../models/Collections');
const User = require('../models/User');
const router = Router()


router.delete("/delete_acc/:id", async (req, res) => {

    const id = req.params.id
    Collections.deleteMany(
        {
            ownerId: id
        },
        async (err, myData) => {
            if (err) return console.log(err);
            return res.send(myData)
        }
    )
    User.deleteOne(
        {
            _id: id
        },
        async (err, myData) => {
            if (err) return console.log(err);
            return res.send(myData)
        }
    )
})

module.exports = router
