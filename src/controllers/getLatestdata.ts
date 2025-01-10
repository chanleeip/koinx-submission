import { NextFunction, Response, Request } from 'express';
import { CoinPriceModel } from '../models/model';

export async function getLatestData(
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
            let docs = await CoinPriceModel.find({coin_id:coin}).sort({timestamp:-1}).limit(12).exec()
            const firstDoc = docs[docs.length - 1];
            const lastDoc = docs[0];
            const priceChange = ((lastDoc.usd_price - firstDoc.usd_price) / firstDoc.usd_price) * 100;
            const market_cap=lastDoc?.market_cap
            const price=lastDoc?.usd_price
            res.json({"24hChange":priceChange,marketCap:market_cap,price:price})
		}
        catch (error) {
		return next(error);
	}
}