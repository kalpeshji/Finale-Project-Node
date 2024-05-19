const mongoose = require('mongoose');

const ProSchema = new mongoose.Schema({
    profileImage: {
        type: String
    },
    name: String,
    description: String,
    extraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory"
    },
    price: Number
});

const ProModel = mongoose.model('Product', ProSchema);

module.exports = ProModel;
