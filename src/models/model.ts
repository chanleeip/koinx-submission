import mongoose, { Document, Schema } from 'mongoose';

interface CoinMetadata extends Document {
  coin_id: string  
  createdAt: Date;    
  history_data:number,
  
}

const coinMetadataSchema = new Schema<CoinMetadata>({
  coin_id: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  history_data: { type: Number, default: 0 }
});

interface CoinPrice extends Document {
    coin_id: string; 
    usd_price: number;
    timestamp: Date;
    market_cap: number;
    price_change_percentage_24h:number;
  }
  
  const coinPriceSchema = new Schema<CoinPrice>({
    coin_id: { type: String, ref: 'CoinMetadata', required: true },
    usd_price: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    market_cap: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required:true }
  });

  coinPriceSchema.post('save', async function (this: CoinPrice, doc: CoinPrice) {
    try {
      const coinMetadata = await CoinMetadataModel.findOne({ coin_id: doc.coin_id });
  
      if (coinMetadata) {
        coinMetadata.history_data += 1;
        await coinMetadata.save();
      }
    } catch (error) {
      console.error('Error incrementing history_data in CoinMetadata:', error);
    }
  });
  
const CoinPriceModel = mongoose.model<CoinPrice>('CoinPrice', coinPriceSchema);
const CoinMetadataModel = mongoose.model<CoinMetadata>('CoinMetadata', coinMetadataSchema);

export  {CoinMetadataModel,CoinPriceModel};