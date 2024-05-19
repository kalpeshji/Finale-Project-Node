const ExtraCatModel = require("../Model/ExtraCategory.Schema");
const ProModel = require("../Model/Product.Schema")
const upload = require("../server")
const fs = require("fs")

const GetAddProduct = async (req, res) => {
    let extradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    });
    res.render('Pages/Admin/AddProduct', { extradata: extradata });
}

const PostAddProduct = async (req, res) => {
    upload(req, res, async function () {
        if (req.file) {
            const { name, description, extracategory, price } = req.body;

            const categoryObject = await ExtraCatModel.findById(extracategory)
                .populate({
                    path: "subcategoryId",
                    populate: {
                        path: "categoryId"
                    }
                });
            const details = {
                profileImage: req.file.filename,
                name: name,
                description: description,
                extraCategoryId: extracategory,
                price: price
            };
            const product = new ProModel(details);
            await product.save();
            res.redirect("/viewproduct");
        } else {
            console.log('Error');
        }
    });
}
const GetEditProduct = async (req, res) => {
    const { id } = req.params;
    const product = await ProModel.findById(id).populate({
        path: "extraCategoryId",
        populate: {
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        }
    });

    const extradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    });

    res.render('Pages/Admin/EditProduct', { product, extradata });
};

// Update product details
const PostEditProduct = async (req, res) => {
    upload(req, res, async function () {
        const { id } = req.params;
        const { name, description, extracategory, price } = req.body;

        const updateData = {
            name: name,
            description: description,
            extraCategoryId: extracategory,
            price: price
        };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        await ProModel.findByIdAndUpdate(id, updateData);
        res.redirect("/viewproduct");
    });
}

const DeleteProduct = async (req, res) => {
    var id = req.params.id
    var image = await ProModel.findOne({ _id: id })
    var result = await ProModel.deleteOne({ _id: id })
    if (result.acknowledged) {
        fs.unlink(`./upload/${image.ProfileImage}`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('Success..')
        })
        res.redirect('/viewproduct')
    }
}
const GetViewProduct = async (req, res) => {
    const data = await ProModel.find().populate({
        path: "extraCategoryId",
        populate: {
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        }
    });
    res.render('Pages/Admin/ViewProduct', { data: data });
}


const GetAddProdct = async (req, res) => {
    let extradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    });
    res.render('Pages/Manager/AddProduct', { extradata: extradata });
}

const PostAddProdct = async (req, res) => {
    upload(req, res, async function () {
        if (req.file) {
            const { name, description, extracategory, price } = req.body;

            const categoryObject = await ExtraCatModel.findById(extracategory)
                .populate({
                    path: "subcategoryId",
                    populate: {
                        path: "categoryId"
                    }
                });
            const details = {
                profileImage: req.file.filename,
                name: name,
                description: description,
                extraCategoryId: extracategory,
                price: price
            };
            const product = new ProModel(details);
            await product.save();
            res.redirect("/viewprodct");
        } else {
            console.log('Error');
        }
    });
}
const GetEditProdct = async (req, res) => {
    const { id } = req.params;
    const product = await ProModel.findById(id).populate({
        path: "extraCategoryId",
        populate: {
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        }
    });

    const extradata = await ExtraCatModel.find().populate({
        path: "subcategoryId",
        populate: {
            path: "categoryId"
        }
    });

    res.render('Pages/Manager/EditProduct', { product, extradata });
};

// Update product details
const PostEditProdct = async (req, res) => {
    upload(req, res, async function () {
        const { id } = req.params;
        const { name, description, extracategory, price } = req.body;

        const updateData = {
            name: name,
            description: description,
            extraCategoryId: extracategory,
            price: price
        };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        await ProModel.findByIdAndUpdate(id, updateData);
        res.redirect("/viewprodct");
    });
}

const DeleteProdct = async (req, res) => {
    var id = req.params.id
    var image = await ProModel.findOne({ _id: id })
    var result = await ProModel.deleteOne({ _id: id })
    if (result.acknowledged) {
        fs.unlink(`./upload/${image.ProfileImage}`, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('Success..')
        })
        res.redirect('/viewprodct')
    }
}
const GetViewProdct = async (req, res) => {
    const data = await ProModel.find().populate({
        path: "extraCategoryId",
        populate: {
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        }
    });
    res.render('Pages/Manager/ViewProduct', { data: data });
}
const GetViwProduct = async (req, res) => {
    const data = await ProModel.find().populate({
        path: "extraCategoryId",
        populate: {
            path: "subcategoryId",
            populate: {
                path: "categoryId"
            }
        }
    });
    res.render('Pages/User/ViewProduct', { data: data });
}
module.exports = { GetAddProduct, PostAddProduct, GetViewProduct, GetEditProduct, PostEditProduct, DeleteProduct, GetAddProdct, PostAddProdct, GetEditProdct, GetViewProdct, PostEditProdct, DeleteProdct, GetViwProduct }