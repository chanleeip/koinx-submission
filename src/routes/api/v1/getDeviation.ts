import { Router } from 'express';
import { getDeviation } from '../../../controllers';

const router = Router();

router.get('/deviation/',getDeviation)

export const deviationRouter: Router = router;