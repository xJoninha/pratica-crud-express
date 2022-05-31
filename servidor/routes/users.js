var express = require('express');
const controller = require('../controllers/UsersController')
var router = express.Router();

/* GET users listing. */
router.get('/', controller.index);

router.get('/adicionar', controller.add);

router.get('/:id/editar', controller.edit);
router.put('/:id/editar', controller.update);

router.get('/:id/apagar', controller.exclude);

router.get('/:id', controller.show);

module.exports = router;
