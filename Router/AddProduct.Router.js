const { Router } = require('express')
const { GetAddProduct, PostAddProduct, GetAddProdct, PostAddProdct } = require('../Controller/Product.Controller')
const { AddProduct, Admin } = require('../Middleware/Admin.Middleware')
const { Manager } = require('../Middleware/Manager.Middleware')

const ProAddRouter = Router()

ProAddRouter.get('/addproduct',Admin, GetAddProduct)
ProAddRouter.post('/addproduct', PostAddProduct)
ProAddRouter.get('/adproduct',Manager, GetAddProdct)
ProAddRouter.post('/adproduct', PostAddProdct)

module.exports = ProAddRouter