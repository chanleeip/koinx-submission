import axios from "axios";
import { CRYPTO_LISTING_ENDPOINT, API_KEY_CRYPTO_LISTING, COIN_IDS } from '../utils/utils';
import {CoinPriceModel} from "../models/model";
interface CoinData {                    
    current_price: number;                  
    market_cap: number;     
    price_change_percentage_24h:number                                     
  }


// interface ApiResponse {
//   CRYPTO_LISTING_ENDPOINT
// }


async function cronJob() {
    try {
      for (const coin_id of COIN_IDS) {
        const response = await axios.get<CoinData[]>(CRYPTO_LISTING_ENDPOINT, {
          headers: {
            'x-cg-demo-api-key': API_KEY_CRYPTO_LISTING,
            accept:'application/json'
          },
          params: {
            "ids": coin_id,
            "vs_currency": "usd"
          }
        });

        if (response.data) {
          const usdValue = response.data[0].current_price; 
        const marketCap = response.data[0].market_cap;  
        const price_change=response.data[0].price_change_percentage_24h
          const Coin_data= new CoinPriceModel({
            coin_id:coin_id,
            usd_price:usdValue,
            timestamp:new Date(),
            market_cap:marketCap,
            price_change_percentage_24h:price_change
          })
          await Coin_data.save()
        }
      }
      }
    catch (error) {
      console.error('Error hitting the API:', error);
    }
}

export default cronJob;