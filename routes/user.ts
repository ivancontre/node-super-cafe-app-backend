import { Router } from 'express';
import { check } from 'express-validator';
import { deleteUser, getUser, patchUser, postUser, putUser } from '../controllers/user';
import { existsEmail, existsUser, isValidRole } from '../helpers/dbValidators';
import { fieldsValidator } from '../middlewares/fieldsValidator';

const router: Router = Router();

router.get(
    '/',
    getUser
);

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('email').custom(existsEmail),
        check('password', 'El password debe de ser al menos de 6 caracteres').isLength({ min: 6 }),
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
    deleteUser
);

router.patch(
    '/',
    patchUser
);

module.exports = router;