import { Router } from 'express';
import { getData, postData } from '../controllers/data.controller';
const router = Router();

router.get('/', getData);
router.post('/', postData);

export default router;
