import { Component, OnInit } from '@angular/core';
import {ImmobilierService} from "../../services/immobilier.service";
import {TransactionService} from "../../services/transaction.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {ImmobilierModelServer} from "../../models/immobilier.model";
import {Immobilier} from "../../models/immobilier";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'mg-mon-immobilier',
  templateUrl: './mon-immobilier.component.html',
  styleUrls: ['./mon-immobilier.component.scss']
})
export class MonImmobilierComponent implements OnInit {


  immobiliers;
  monimmobiliers ;
  transactionsImmobilier;
  adresscurentuser;
  public host:String = "http://localhost:8081";
  idImmobilier;
  closeResult: string="";
  constructor(private modalService: NgbModal,private immobilierService: ImmobilierService,private transactionService:TransactionService,private usersService:UsersService,
              //   private cartService: CartService,
              private router:Router,private route:ActivatedRoute) {

    //---------- for prond url de navigator a chaque chongment de se url---------------
    router.events.subscribe(event=>{
      if (event instanceof NavigationEnd){

        //console.log(this.route.snapshot.params.urlProds);
        // console.log("paramMap.get('lang') issss "+this.route.snapshot.paramMap.get('lang'));
        let url1 =  this.route.snapshot.url.pop();
        this.adresscurentuser=url1;
        //route.snapshot.url.push();
        console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai
        // let url = atob(url1.toString());
        ///////////////////////////////////this.getProdutcts(url1);
        // console.log("Fonction atob pour url ="+url);
      }
    })
    /*  //console.log(this.route.snapshot.params.urlProds);
     // console.log("paramMap.get('lang') issss "+this.route.snapshot.paramMap.get('lang'));
      let url1 =  this.route.snapshot.url.pop();
      //route.snapshot.url.push();
      console.log("urlProds issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai
    // let url = atob(url1.toString());
      this.getProdutcts(url1);
     // console.log("Fonction atob pour url ="+url); */
  }

  ngOnInit(): void {

if (this.idImmobilier!=undefined)
   this.AnnouncedChange(this.idImmobilier);
    this.getAdresssByUserName();
  }
  Immo:Immobilier=new Immobilier();
  changePrice(id:number){
    this.immobilierService.getImmobilierByid(id).subscribe(res=>{
      this.Immo=res;
    })
    console.log(this.Immo);
  }
  changePriceNow(){
    this.immobilierService.setPrice(this.Immo.id,this.Immo).subscribe(
      res=>{
        console.log(res);
        window.location.href = 'monImmobilier/'+this.Immo.addressOwner;
      }
    );
  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getAdresssByUserName(){
    console.log(" this.usersService.getCurrentAdressUser() = "+ this.usersService.getCurrentAdressUser()) ;
    console.log("  this.adresscurentuser = "+  this.adresscurentuser) ;
    console.log(this.adresscurentuser) ;
    console.log(this.adresscurentuser) ;
    this.immobilierService.getRessource(this.host + "/listImmobilier/" +  this.adresscurentuser).subscribe(data=>{
      console.log("listImmobilier");
      console.log(data);
      console.log("immobilierCurrent");
      this.monimmobiliers=data;
      console.log(this.monimmobiliers);
      console.log("immobilierCurrent");

      this.immobilierService.setmonImmobiliersAdress(this.adresscurentuser);

    },error=>{
      console.log(error);
    })
  }

  imm:Immobilier=new Immobilier();
  urlImageaddd;

  addImmobilier() {
     this.imm.image=this.urlImageaddd;
     this.imm.addressOwner=localStorage.getItem('adresscurentuser');
     console.log(this.imm.price);
    this.immobilierService.addImmobilier(this.imm).subscribe(data=>{
    console.log(data);
    window.location.reload();
    },error=>{
    console.log(error);
    })
}
onSelectImage(event) {
    console.log(event);
    if (event.target.files){
      console.log(event.target.files[0].name);
      this.urlImageaddd="./assets/img/"+event.target.files[0].name;
      console.log("urlImageaddd : "+this.urlImageaddd);
    }
  }


  AnnouncedChange(idImmobilier) {
    this.idImmobilier=idImmobilier;
    this.immobilierService.ChangeAnnonceImmobilier(idImmobilier).subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
    //this.router.navigateByUrl("/");
    window.location.reload();
  }


}














