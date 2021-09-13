import { Router } from 'express';
import { check, query } from 'express-validator';
import { deleteUser, getUser, patchUser, postUser, putUser } from '../controllers/user';
import { existsEmail, existsUser, isValidRole } from '../helpers/dbValidators';

import {
    fieldsValidator,
    verifyJWT,
    hasRole

} from '../middlewares';

const router: Router = Router();

//router.use(verifyJWT);

router.get(
    '/',
    [
        query('limit', 'El queryParmas "limit" debe ser un número entero').optional().isNumeric(),
        query('from', 'El queryParams "from" debe ser un número entero').optional().isNumeric(),
        fieldsValidator
    ],
    getUser
);

router.post(
    '/',
    [
        check('name', 'El campo "name" es obligatorio').not().isEmpty(),
        check('email', 'El campo "email" es obligatorio').isEmail(),
        check('email').custom(existsEmail),
        check('password', 'El campo "password" debe de ser al menos de 6 caracteres').isLength({ min: 6 }),
        check('role').custom(isValidRole),
        fieldsValidator
    ],
    postUser
);

router.put(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        check('id').custom(existsUser),
        fieldsValidator
    ],
    putUser
);

router.delete(
    '/:id',
    verifyJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    [
        check('id', 'El ID no es válido').isMongoId(),
        check('id').custom(existsUser),
        fieldsValidator
    ],
    deleteUser
);

router.patch(
    '/',
    patchUser
);

module.exports = router;