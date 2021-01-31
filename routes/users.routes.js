const { Router } = require('express')
const Collections = require('../models/Collections');
const Items = require('../models/Items');
const User = require('../models/User')
const router = Router()


router.get("/users", async (req, res) => {

    const length = req.params.length


    User.find({}, '_id name img hasCollections', async (err, users) => {
        if (err) return console.log(err);
        return res.send(users)
    });
});

router.put("/has_collection/:userId", async (req, res) => {

    const id = req.params.userId

    User.updateOne({ _id: id }, { $set: { hasCollections: true } }, async (err, users) => {
        mongoose.disconnect();
        if (err) return console.log(err);
        return res.send(users)
    });

});

router.get("/my_items/:collectionId", async (req, res) => {

    const id = req.params.collectionId

    Items.find({ collectionId: id }, async (err, myData) => {
        if (err) return console.log(err);
        return res.send(myData)
    });
});


router.get("/my_collections/:userId", async (req, res) => {

    const id = req.params.userId

    Collections.find({ ownerId: id }, async (err, myData) => {
        if (err) return console.log(err);
        return res.send(myData)
    });
});


router.get("/my_data/:userId", async (req, res) => {

    const id = req.params.userId

    User.findOne({ _id: id }, async (err, myData) => {
        if (err) return console.log(err);
        return res.send(myData)
    });
});



module.exports = router