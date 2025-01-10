import { Router } from 'express';
import { getLatestData } from '../../../controllers';

const router = Router();

router.get('/stats',getLatestData as any)

export const statsRouter: Router = router;