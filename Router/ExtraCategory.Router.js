const { Router } = require('express')
const { GetExtraCategory, PostExtraCategory, GetExtraCategry, PostExtraCategry } = require('../Controller/ExtraCategory.Controller')
const { AddProduct, Admin } = require('../Middleware/Admin.Middleware')
const { Manager } = require('../Middleware/Manager.Middleware')

const ExtraCatRouter = Router()

ExtraCatRouter.get('/extracategory',Admin, GetExtraCategory)
ExtraCatRouter.post('/extracategory', PostExtraCategory)
ExtraCatRouter.get('/extracategry',Manager, GetExtraCategry)
ExtraCatRouter.post('/extracategry', PostExtraCategry)

module.exports = ExtraCatRouter