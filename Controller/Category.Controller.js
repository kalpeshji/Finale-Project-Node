const CatModel = require("../Model/Category.Schema");

const GetCategory = (req, res) => {
    res.render('Pages/Admin/Category')
}
const GetCategry = (req, res) => {
    res.render('Pages/Manager/Category')
}
const PostCategory = async (req, res) => {
    try {

        const newCategory = new CatModel(req.body);

        const result = await newCategory.save();

        console.log("Category saved successfully:", result);

        res.redirect('/subcategory');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
};
const PostCategry = async (req, res) => {
    try {

        const newCategory = new CatModel(req.body);

        const result = await newCategory.save();

        console.log("Category saved successfully:", result);

        res.redirect('/subcategry');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
};
module.exports = { GetCategory, PostCategory, GetCategry, PostCategry }