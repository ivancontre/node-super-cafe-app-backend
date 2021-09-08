import { Router } from 'express';
import { deleteUser, getUser, patchUser, postUser, putUser } from '../controllers/user';

const router: Router = Router();

router.get(
    '/',
    getUser
);

router.post(
    '/',
    postUser
);

router.put(
    '/:id',
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