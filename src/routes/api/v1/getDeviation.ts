import { Router } from 'express';
import { getDeviation } from '../../../controllers';

const router = Router();

router.get('/deviation',getDeviation as any) 

export const deviationRouter: Router = router;