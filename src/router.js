const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
    res.json({msg: 'Hello World'});
});

module.exports = routes;