const mongoose = require('mongoose')
const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const CatModel = mongoose.model('Category', CatSchema)

module.exports = CatModel