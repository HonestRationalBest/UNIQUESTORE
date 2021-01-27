const { Schema, model, Types } = require('mongoose')

const items = new Schema({
    collectionId: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    img: { type: String, required: true },
    likesCount: { type: Number, require: true },
    tegs: { type: Array }
})

module.exports = model("Items", items)