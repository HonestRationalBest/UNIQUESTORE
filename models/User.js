const { Schema, model, Types } = require('mongoose')


// const comments = new Schema({
//     username: { type: String, required: true },
//     date: { type: Date, required: true },
//     title: { type: String, required: true },
// })

// const items = new Schema({
//     name: { type: String, required: true },
//     likesCount: { type: Number, required: true },
//     commentCount: { type: Number, required: true },
//     img: { type: String, required: true },
//     tegs: { type: Array },
//     comments: [comments]
// })

// const collections = new Schema({
//     name: { type: String, required: true },
//     date: { type: Date, required: true },
//     img: { type: String, required: true },
//     items: [items]
// })

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String },
    name: { type: String, required: true },
    hasCollections: { type: Boolean, required: true },
})

module.exports = model("User", schema)