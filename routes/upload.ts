import { Router } from 'express';
import { upload } from '../controllers';
import { verifyJWT } from '../middlewares';

const router: Router = Router();

router.post(
    '/',
    verifyJWT,
    upload
);

module.exports = router;