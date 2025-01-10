import { Router } from 'express';
import { statsRouter } from './api/v1/getLatestPrice';
const router: Router = Router();
router.use(statsRouter)
export const MainRouterV1: Router = router;