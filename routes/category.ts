import { Router } from 'express';
import { check } from 'express-validator';
import { 
    deleteCategory, 
    getCategories, 
    getCategory, 
    postCategory, 
    putCategory 
} from '../controllers/category';
import { fieldsValidator, verifyJWT } from '../middlewares';

const router: Router = Router();

router.get('/', getCategories);

router.get('/:id', getCategory);

router.post(
    '/', 
    verifyJWT, 
    [
        check('name', 'El campo "name" es obligatorio').not().isEmpty(),
        fieldsValidator
    ],
    postCategory
);

router.put('/:id', putCategory);

router.delete('/:id', deleteCategory);

module.exports = router;