var express = require('express');
var router = express.Router();

var controller = require('../controller/users.controller');


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/infouser', controller.infoUser);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/:id', controller.get);

router.get('/update/:id', controller.update);

router.post('/update', controller.postUpdate);

router.get('/del/:id', controller.delete);

module.exports = router;