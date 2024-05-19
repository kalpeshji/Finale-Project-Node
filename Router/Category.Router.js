const { Router } = require('express')
const { GetCategory, PostCategory, GetCategry, PostCategry } = require('../Controller/Category.Controller')
const { AddProduct, Admin } = require('../Middleware/Admin.Middleware')
const { Manager } = require('../Middleware/Manager.Middleware')

const CatRouter = Router()

CatRouter.get('/category',Admin, GetCategory)
CatRouter.post('/category', PostCategory)
CatRouter.get('/categry',Manager, GetCategry)
CatRouter.post('/categry', PostCategry)

module.exports = CatRouter