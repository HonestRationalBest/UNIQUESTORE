const { Schema, model, Types } = require('mongoose')

const collections = new Schema({
    ownerId: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    img: { type: String, required: true },
})

module.exports = model("Collections", collections)