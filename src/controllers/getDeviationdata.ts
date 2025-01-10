import { NextFunction, Response, Request } from 'express';
import { CoinPriceModel } from '../models/model';

export async function getDeviation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
            const coin=req.query.coin;
            if (!coin) {
                res.status(400).json({ error: 'Missing coin parameter' });
              }
              console.log(coin)
            let docs = await CoinPriceModel.find({coin_id:coin}).sort({timestamp:-1}).limit(100).exec()
            const prices = docs.map(doc => doc.usd_price);
            const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
            const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
            const standardDeviation = Math.sqrt(variance);
            res.json({"deviation":standardDeviation})
		}
        catch (error) {
		return next(error);
	}
}