const CatModel = require("../Model/Category.Schema");
const SubCatModel = require("../Model/SubCategory.Schema");

const GetSubCategory = async (req, res) => {
    let subdata = await SubCatModel.find({}).populate("categoryId")
    let catdata = await CatModel.find({})
    res.render('Pages/Admin/SubCategory', { subdata: subdata, catdata: catdata });
}
const PostSubCategory = async (req, res) => {
    try {

        const newSubCategory = new SubCatModel(req.body);

        const result = await newSubCategory.save();

        console.log("SubCategory saved successfully:", result);

        res.redirect('/extracategory');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
}
const GetSubCategry = async (req, res) => {
    let subdata = await SubCatModel.find({}).populate("categoryId")
    let catdata = await CatModel.find({})
    res.render('Pages/Manager/SubCategory', { subdata: subdata, catdata: catdata });
}
const PostSubCategry = async (req, res) => {
    try {

        const newSubCategory = new SubCatModel(req.body);

        const result = await newSubCategory.save();

        console.log("SubCategory saved successfully:", result);

        res.redirect('/extracategry');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
}

module.exports = { GetSubCategory, PostSubCategory, GetSubCategry, PostSubCategry }
