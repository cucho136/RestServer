


const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPatch, usuariosPost } = require('../controllers/usuarios');
const { esRolevalido, MailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const router = Router()


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRolevalido ),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(MailExiste),
    check('password', 'El password debe ser de mas de 6 letras').isLength({ min:6}),
    check('rol').custom( esRolevalido ),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);







module.exports = router;