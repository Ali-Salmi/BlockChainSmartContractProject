import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Immobilier } from 'src/app/models/immobilier';
import { ImmobilierAnn } from 'src/app/models/immobilier-ann';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ContractService } from 'src/app/services/contract.service';
import { ImmobilierService } from 'src/app/services/immobilier.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'mg-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewcartComponent implements OnInit {

  adresscurentuser;
  adresscurentuserString;
  AllimmobilierProve;
  AllimmobilierProvel;
  id;
  idrouter;
  ImmobilierAnn:ImmobilierAnn=new ImmobilierAnn();
  Immobilier:Immobilier=new Immobilier();
 // allImmobiliersCarts: Array<ImmobilierModelServer> = [];
  constructor(private contractService:ContractService,private authService:AuthenticationService,private usersService:UsersService,private router:Router,private immobilierService:ImmobilierService,private cartService:CartService  ,private route:ActivatedRoute) {

  router.events.subscribe(event=>{
  if (event instanceof NavigationEnd){


  let url1 =  this.route.snapshot.url.pop();
  this.idrouter=url1;
  console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai

}
})

}


  ngOnInit(): void {
    this.authService.loadToken();
    this.getAdresssByUserName();
    this.getimmobiliernotProve();

  }

  Logout() {
    this.authService.Logout();

  }
  getAdresssByUserName(){

    console.log("getAdresssByUserNameeeeeeeeee");
    this.usersService.getAdressbyUsername().subscribe(data=>{
      console.log("getAdresssByUserNameeeeeeeeee");
      console.log(data);
      console.log("getAdresssByUserNameeeeeeeeee");
      this.adresscurentuser=data;
    },error=>{

      //   this.adresscurentuserData=error;
      console.log(error);

    })
  }

 getimmobiliernotProve(){
   this.immobilierService.getAllImmobiliers().subscribe(data=>{
     console.log("getimmobiliernotProve : "+data);
     this.AllimmobilierProve=data;
   },error=>{

     console.log(error);

   })
   this.immobilierService.getAllImmobiliersnotProved().subscribe(data=>{
     console.log("getimmobiliernotProve : "+data);
     this.AllimmobilierProvel=data;
   },error=>{

     console.log(error);

   })
 }

  selectImmobilier(idd) {

    window.location.href = 'Immobilier/'+idd;
  }

  DeleteImmobilierFromCart(id) {
    console.log(id);
    this.immobilierService.deleteImmobilier(id).subscribe(data=>{
      console.log("getimmobiliernotProve : "+data);

    },error=>{

      console.log(error);

    })
    window.location.href = 'home/'+this.adresscurentuser;
  }

  async ConfirmerImmobilierFromCart(id: number) {
    console.log(id);
    this.immobilierService.confirmerdeleteImmobilier(id).subscribe(data=>{

    },error=>{
      console.log(error);
    })

    await this.immobilierService.getImmobilierByid(id).subscribe(res=>{
      this.Immobilier=res;
      this.ImmobilierAnn.ownerAdress = this.Immobilier.addressOwner;
      this.ImmobilierAnn.titre = this.Immobilier.titer;
      console.log(this.ImmobilierAnn);
      console.log(this.Immobilier);
      this.contractService.addImmobilier(this.ImmobilierAnn).subscribe();
      window.location.href = 'home/'+this.adresscurentuser;
    });


  }

}
