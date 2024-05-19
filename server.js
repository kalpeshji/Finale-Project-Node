// Express
const express = require('express')
const app = express()

// DB
const db = require('./Config/db');

// fs
const fs = require('fs')

// Multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './upload')
    },
    filename: (req, file, cb) => {
        return cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('uploadImage')
app.use(express.static('upload'))
module.exports = upload

// PORT
const PORT = 8000;

// Route Import
const RegisterRoute = require('./Router/Register.Router');
const LoginRouter = require('./Router/Login.Router');
const DashboardRouter = require('./Router/Dashboard.Router');
const CatRouter = require('./Router/Category.Router');
const SubCatRouter = require('./Router/SubCategory.Router');
const ExtraCatRouter = require('./Router/ExtraCategory.Router');
const ProAddRouter = require('./Router/AddProduct.Router');
const UserRouter = require('./Router/User.Router');
const ViewProRouter = require('./Router/ViewProduct.Router');
const { authenticateUser } = require('./Middleware/Auth.Middleware');
const ErrorRouter = require('./Router/Error.Router');

// Colors
const colors = require('colors');

// View Engine
app.set('view engine', 'ejs')

// Public
app.use(express.static('Public'))

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Session
const session = require('express-session');
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// urlencoded
app.use(express.urlencoded({ extended: false }))

// Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Route
app.use('/', RegisterRoute)
app.use('/', LoginRouter)
app.use('/', DashboardRouter)
app.use('/', CatRouter)
app.use('/', SubCatRouter)
app.use('/', ExtraCatRouter)
app.use('/', ProAddRouter)
app.use('/', UserRouter)
app.use('/', ViewProRouter)
app.use('/', ErrorRouter)


// Listen
app.listen(PORT, () => {
    db();
    console.log(`Server is running here: http://localhost:${PORT}`.green.bold);
});