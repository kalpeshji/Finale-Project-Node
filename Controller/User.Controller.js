const RegisterModel = require("../Model/Register.Schema")

const GetUser = async (req, res) => {
    const data = await RegisterModel.find()
    res.render('Pages/Admin/User', { data: data })
}
const PromoteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await RegisterModel.findByIdAndUpdate(userId, { roll_id: 2 });
        res.redirect('/user');
    } catch (error) {
        res.status(500).send('Error promoting user');
    }
}
module.exports = { GetUser, PromoteUser }