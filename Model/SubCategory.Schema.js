const mongoose = require('mongoose')
const SubCatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true })

const SubCatModel = mongoose.model('SubCategory', SubCatSchema)

module.exports = SubCatModel