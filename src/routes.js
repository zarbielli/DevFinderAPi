// For import just a section of a module use {}, in this case I am importing
// just the router from the express module
const { Router } = require('express');
const DevsController = require('./controllers/DevsController');
// Creates an Router object
const routes = Router();

// Params Types:

// Query Params: ?paramName=Value embedded in the route. You can acess it with
// request.query ( Generally used for filters, ordenadtions or paginations).

// Route Params: Used generally used with PUT or DELETE, to pass a specific
// object of your Database that will be updated or deleted.
// request.params

// Body: Is the body of a request and it is used generally with POST or PUTS to
// pass the params that will be used to for example instantiate a new object,
// like a new user, so the user email and user password will be send to our APi
// as body of a POST requisition.
// request.body

routes.post('/devs', DevsController.CreateDev);
routes.get('/devs', DevsController.Index);

// That exports the routes object, this allows who import routes access
// all routes
module.exports = routes;
