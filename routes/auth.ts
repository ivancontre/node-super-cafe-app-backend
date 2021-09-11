import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { fieldsValidator } from '../middlewares/fieldsValidator';
import { existsEmail } from '../helpers/dbValidators';

const router: Router = Router();

router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldsValidator
    ],
    login
);

module.exports = router;