const { Router } = require('express')
const { GetSubCategory, PostSubCategory, PostSubCategry, GetSubCategry } = require('../Controller/SubCategory.Controller')
const { AddProduct, Admin } = require('../Middleware/Admin.Middleware')
const { Manager } = require('../Middleware/Manager.Middleware')

const SubCatRouter = Router()

SubCatRouter.get('/subcategory',Admin, GetSubCategory)
SubCatRouter.post('/subcategory', PostSubCategory)
SubCatRouter.get('/subcategry',Manager, GetSubCategry)
SubCatRouter.post('/subcategry', PostSubCategry)

module.exports = SubCatRouter