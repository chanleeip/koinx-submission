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
            let doc= await CoinPriceModel.findOne({coin_id:coin}).sort({timestamp:-1})
            const priceChange = doc?.price_change_percentage_24h
            const market_cap=doc?.market_cap
            const price=doc?.usd_price
            res.json({"24hChange":priceChange,marketCap:market_cap,price:price})
		}
        catch (error) {
		return next(error);
	}
}