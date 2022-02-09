export class Immobilier {
  id: number;
  addressOwner: string;
  price: number;
  surface: number;
  titer:string;
  image: string;
  announced: boolean;
  ville: string;
  constructor() {
    this.id=0;
    this.addressOwner="";
    this.price=0;
    this.surface=0;
    this.titer="";
    this.image="";
    this.announced=true;
    this.ville="";
  }
}
