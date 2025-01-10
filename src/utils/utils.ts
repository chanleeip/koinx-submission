import dotenv from 'dotenv';
dotenv.config();

const CRYPTO_LISTING_ENDPOINT=process.env.CRYPTO_LISTING_ENDPOINT || 'https://api.coingecko.com/api/v3/coins/id';
const API_KEY_CRYPTO_LISTING=process.env.API_KEY_CRYPTO_LISTING || '';
const COIN_IDS:string[]=[
    process.env.ETHEREUM || "ethereum",
  process.env.MATIC_ID ||"matic-netword" ,
  process.env.BITCOIN_ID || "bitcoin"
]
const MONGODB_URI=process.env.MONGODB_URI || ''

export {CRYPTO_LISTING_ENDPOINT,API_KEY_CRYPTO_LISTING,COIN_IDS,MONGODB_URI}