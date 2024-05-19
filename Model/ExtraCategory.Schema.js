const mongoose = require('mongoose')
const ExtraCatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }
}, { timestamps: true })

const ExtraCatModel = mongoose.model('ExtraCategory', ExtraCatSchema)

module.exports = ExtraCatModel