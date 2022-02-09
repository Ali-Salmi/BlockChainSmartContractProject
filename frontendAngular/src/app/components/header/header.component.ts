import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UsersService} from "../../services/users.service";
import {HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ImmobilierService} from "../../services/immobilier.service";
import {ImmobilierModelServer} from "../../models/immobilier.model";
import {CartService} from "../../services/cart.service";
import {ContractService} from "../../services/contract.service";
import {ImmobilierAnn} from "../../models/immobilier-ann";
import {Immobilier} from "../../models/immobilier";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
  //route.snapshot.url.push();
  console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai

}
})

}
isAdmin(){
    return this.authService.isAdmin();
  }
  isUser(){
    return this.authService.isUser();
  }
  isAtheticated(){
    //console.log("isAtheticated est "+ this.authService.isAtheticated())
    return this.authService.isAtheticated();
  }
  isAdressCurentExist(){
    if (this.adresscurentuser!=null){
      return true;
    }else
    return false;
  }

  ngOnInit(): void {
    this.authService.loadToken();
    this.getAdresssByUserName();
    this.getimmobiliernotProve();
  //  this.selectImmobilier(this.id);
   // this.getallCartUser();
  }

  Logout() {
    this.authService.Logout();

  }
  getAdresssByUserName(){
    /*    this.alluserData._embedded.appUsers.forEach(function (value) {
          console.log(value);
        });*/
    //  this.allUsers=this.alluserData._links.self.href;//.appUsers.username
    //  console.log(this.allUsers);
    // this.adresscurentuser= this.userService.getAdressbyUsername();
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
/*getallCartUser(){
      this.allImmobiliersCarts= this.cartService.getallImmobiliersCarts();
    console.log(this.allImmobiliersCarts.pop());
}*/
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
