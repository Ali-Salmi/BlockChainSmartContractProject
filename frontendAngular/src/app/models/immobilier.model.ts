export interface ImmobilierModelServer {
  id: Number;
  addressOwner: String;
  price: Number;
  surface: Number;
  image: String;
  announced: Boolean;
  ville: String;
}


export interface serverResponse  {
  count: number;
  products: ImmobilierModelServer[]
};
