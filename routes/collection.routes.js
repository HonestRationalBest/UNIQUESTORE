const { Router } = require('express');
const Collections = require('../models/Collections');
const router = Router()


router.get("/collecion/:collectionId", async (req, res) => {

    const id = req.params.collectionId
    // User.aggregate(
    //     { $unwind: "$bars" },
    //     {
    //         $lookup: {
    //             from: "bar",
    //             localField: "bars",
    //             foreignField: "_id",
    //             as: "bar"

    //         }
    //     },
    //     {
    //         $match: {
    //             "bar.testprop": true
    //         }
    //     }
    // )

    // User.aggregate([
    //     { "$match": { "_id": userId } },
    //     { "$project": { 
    //         "collections": { 
    //             "$filter": { 
    //                 "input": "$collections", 
    //                 "in": "ob", 
    //                 "cond": { 
    //                     "$and": [ 
    //                         { "$lte": [ "$$obj.fieldA", 3 ] },
    //                         { "$gte": [ "$$obj.fieldB", 5 ] },
    //                     ]
    //                 }
    //             }
    //         }
    //     }}
    // ])
    Collections.find(
        {
            _id: id
        },
        async (err, myData) => {
            if (err) return console.log(err);
            return res.send(myData)
        }
    )
    // User.aggregate({ $unwind: "$collections" }, async (err, myData) => {
    //     if (err) return console.log(err);
    //     return res.send(myData)
    // });
    // User.find({ $and: [{ _id: userId }, { collections: { _id: collectionId } }] }, async (err, myData) => {
    //     if (err) return console.log(err);
    //     return res.send(myData)
    // });
    // User.findOne({ "$ref": collections, "$id": id }, async (err, myData) => {
    //     if (err) return console.log(err);
    //     return res.send(myData)
    // });
});


module.exports = router
