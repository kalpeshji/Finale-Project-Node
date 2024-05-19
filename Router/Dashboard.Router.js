const { Router } = require('express');
const { GetDashboard } = require('../Controller/Dashboard.Controller');
const { authenticateUser } = require('../Middleware/Auth.Middleware');
const { ViewUser } = require('../Middleware/Manager.Middleware');
const { Admin } = require('../Middleware/Admin.Middleware');
const DashboardRouter = Router();

DashboardRouter.get('/dashboard', Admin, GetDashboard);

module.exports = DashboardRouter;
