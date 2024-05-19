const ExtraCatModel = require('../Model/ExtraCategory.Schema')
const SubCatModel = require('../Model/SubCategory.Schema')

const GetExtraCategory = async (req, res) => {

    let extaradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    })
    console.log(extaradata)
    let subdata = await SubCatModel.find({})

    res.render('Pages/Admin/ExtraCategory', { extaradata: extaradata, subdata: subdata });
}
const PostExtraCategory = async (req, res) => {
    try {

        const newExtaraCategory = new ExtraCatModel(req.body);

        const result = await newExtaraCategory.save();

        console.log("Extara Category saved successfully:", result);

        res.redirect('/addproduct');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
}
const GetExtraCategry = async (req, res) => {

    let extaradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    })
    console.log(extaradata)
    let subdata = await SubCatModel.find({})

    res.render('Pages/Manager/ExtraCategory', { extaradata: extaradata, subdata: subdata });
}
const PostExtraCategry = async (req, res) => {
    try {

        const newExtaraCategory = new ExtraCatModel(req.body);

        const result = await newExtaraCategory.save();

        console.log("Extara Category saved successfully:", result);

        res.redirect('/adproduct');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
}


module.exports = { GetExtraCategory, PostExtraCategory, GetExtraCategry, PostExtraCategry };