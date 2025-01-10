import { Router } from 'express';
import { statsRouter } from './api/v1/getLatestPrice';
import { deviationRouter } from './api/v1/getDeviation';
const router: Router = Router();
router.use(statsRouter)
router.use(deviationRouter)
export const MainRouterV1: Router = router;