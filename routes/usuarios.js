const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

//controladores
const {validarCampos} = require("../middlewares/validar-campos")
const {emailExiste} = require("../helpers/db-validators");

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require("../controllers/usuarios");


router.get("/", usuariosGet);

router.post(
    "/",
    [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("password", "Debe tener una contraseña").not().isEmpty().trim(),
    check("password", "La contraseña debe tener un minimo de 5 caracteres").isLength({
        min:6,
    }),
    //tener en cuenta expresiones regulares desde el front para las validaciones.
    check("email", "Ya tenemos un usuario registrado con ese email").isEmail(),
    check("email").custom(emailExiste),
    check("rol", "No es un rol valido").isIn(["ADMIN_ROL", "USER_ROL", "KITCHEN_ROL", "WAITER_ROL"]),
    validarCampos
    ],
    usuariosPost
);

router.put(
    "/:id",
    [
    check("id", "Ese ide no es parte de la tasty familia").isMongoId(),
    validarCampos
    ],
    usuariosPut
);

router.delete("/:id", usuariosDelete);

module.exports = router;