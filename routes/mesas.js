const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

//controladores
const {validarCampos} = require("../middlewares/validar-campos")
const { idMesaExiste } = require('../helpers/db-validators');

const {
    mesasGet,
    mesasPost,
    mesasPut,
    mesasDelete
} = require("../controllers/mesas");


router.get("/", mesasGet);

router.post(
    "/",
    [
    check("numero","El numero de mesa es obligatorio").not().isEmpty(),
    validarCampos
    ],
    mesasPost
);

router.put(
    "/:id",
    [
    check("id", "El menu no existe"),
    check("id").custom(idMesaExiste),
    validarCampos
    ],
    mesasPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(idMesaExiste),
        validarCampos
    ],
    mesasDelete
);

module.exports = router;