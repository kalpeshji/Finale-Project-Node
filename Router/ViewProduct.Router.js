const { Router } = require('express')
const { GetViewProduct, GetEditProduct, PostEditProduct, DeleteProduct, GetViwProduct, DeleteProdct, PostEditProdct, GetEditProdct, GetViewProdct } = require('../Controller/Product.Controller')
const { Admin } = require('../Middleware/Admin.Middleware')
const { Manager } = require('../Middleware/Manager.Middleware')
const { User } = require('../Middleware/User.Middleware')

const ViewProRouter = Router()

ViewProRouter.get('/viewproduct', Admin, GetViewProduct)
ViewProRouter.get('/editproduct/:id', GetEditProduct)
ViewProRouter.post('/editproduct/:id', PostEditProduct)
ViewProRouter.get('/deleteproduct/:id', DeleteProduct)
ViewProRouter.get('/viewprodct', Manager, GetViewProdct)
ViewProRouter.get('/editprodct/:id', GetEditProdct)
ViewProRouter.post('/editprodct/:id', PostEditProdct)
ViewProRouter.get('/deleteprodct/:id', DeleteProdct)
ViewProRouter.get('/viwproduct', User, GetViwProduct)

module.exports = ViewProRouter