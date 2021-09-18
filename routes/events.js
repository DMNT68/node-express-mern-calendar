/* 
    Events routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(validarJWT);

// obtener eventos
router.get('/getEventos', getEventos);

// Crear un nuevo evento
router.post(
  '/crearEvento',
  [
    check('title', 'titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar Evento
router.put('/actualizarEvento/:id', actualizarEvento);

// Borrar evento
router.delete('/eliminarEvento/:id', eliminarEvento);

module.exports = router;
