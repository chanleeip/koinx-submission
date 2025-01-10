import express,{ Response,Request } from "express";
import cronJob from "./services/cron_job";
import cron from 'node-cron';
import { MainRouterV1 } from "./routes";
import {connect} from './models/index'
const app=express()
const port=process.env.PORT || 3000

const job = cron.schedule('0 */2 * * *', async ()=> {
  await cronJob()
});
connect();
app.use(MainRouterV1)
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });