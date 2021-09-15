import { Router } from 'express';
import { check } from 'express-validator';
import { google, login } from '../controllers/auth';
import { fieldsValidator } from '../middlewares/fieldsValidator';

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

router.post(
    '/google',
    [
        check('id_token', 'El id_token es obligatorio').notEmpty(),
        fieldsValidator
    ],
    google
);

module.exports = router;