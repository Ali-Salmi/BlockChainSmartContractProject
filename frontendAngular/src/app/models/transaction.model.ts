export interface TransactionModelServer {
  id: Number;
  addressrecipent: String;
  immobilier_id:Number;
}


export interface serverResponse  {
  count: number;
  products: TransactionModelServer[]
};
