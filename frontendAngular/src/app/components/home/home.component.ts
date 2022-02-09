import { Component, OnInit } from '@angular/core';
import {AnnonceService} from "../../services/annonce.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ImmobilierService} from "../../services/immobilier.service";
import {ImmobilierModelServer} from "../../models/immobilier.model";
import {TransactionService} from "../../services/transaction.service";
import {CartService} from "../../services/cart.service";
import {ImmobilierAnn} from "../../models/immobilier-ann";
import {ContractService} from "../../services/contract.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Immobilier } from 'src/app/models/immobilier';
import { transaction } from 'src/app/models/transaction';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  immobiliers;
  immobilierCurrent ;
  transactionsImmobilier;
  adressUserCurrent;
  priceSelected:any=200000;
 // allImmobiliersCarts: Array<ImmobilierModelServer> = [];
  public host:String = "http://localhost:8081";
  constructor(private modalService: NgbModal,private contractService:ContractService ,private immobilierService: ImmobilierService,private transactionService:TransactionService,
           //   private cartService: CartService,
              private router:Router,private route:ActivatedRoute,private cartService:CartService) {


    //---------- for prond url de navigator a chaque chongment de se url---------------
    router.events.subscribe(event=>{
      if (event instanceof NavigationEnd){

        //console.log(this.route.snapshot.params.urlProds);
        // console.log("paramMap.get('lang') issss "+this.route.snapshot.paramMap.get('lang'));
        let url1 =  this.route.snapshot.url.pop();
        this.adressUserCurrent=url1;
        //route.snapshot.url.push();
        console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai


        // let url = atob(url1.toString());
        ///////////////////////////////////this.getProdutcts(url1);
        // console.log("Fonction atob pour url ="+url);
      }
      this.immobilierService.getMaxPrice(this.adressUserCurrent).subscribe(res=>{
        this.priceSelected=res;
      });
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

  search(priceSelected){
    console.log("ghjkl"+this.priceSelected)

    this.ngOnInit();
  }
  ngOnInit(): void {
    if(this.priceSelected==0)this.immobilierService.getMaxPrice(this.adressUserCurrent).subscribe(res=>{
      this.priceSelected=res;
    });
    this.ongetAllImmobilier();
  }
 async ongetAllImmobilier(){
  if(this.priceSelected==0)this.immobilierService.getMaxPrice(this.adressUserCurrent).subscribe(res=>{
    this.priceSelected=res;
  });
    await this.immobilierService.getImmobilierByPrice(this.adressUserCurrent,this.priceSelected).subscribe((data:ImmobilierModelServer[])=>{
      console.log(data);
      this.immobiliers=data;
    },error=>{
      console.log(error);
    })
    localStorage.setItem('adresscurentuser',this.adressUserCurrent);
  }

  selectImmobilier(id) {
    /////////////

  /*  this.selectTransaction(id);
    this.immobilierService.setTransactionCurrent(this.transactionsImmobilier);
    console.log("this.transactionsImmobilier ");
    console.log(this.transactionsImmobilier);
    ////////////////
    this.immobilierService.getRessource(this.host + "/getImmobilier/" + id).subscribe(data=>{
      console.log("dataCurrent");
      console.log(data);
      console.log("immobilierCurrent");
      this.immobilierCurrent=data;
      console.log(this.immobilierCurrent);
      console.log("immobilierCurrent");

      this.immobilierService.setimmobilierCurrent(this.immobilierCurrent);

     // this.router.navigate(['/Immobilier',id]).then();
      this.router.navigateByUrl("/Immobilier/"+id);
    },error=>{
      console.log(error);
    })*/
    this.router.navigateByUrl("/Immobilier/"+id);
  }
  selectTransaction(id) {
    /*this.transactionService.getRessource(this.host + "/transactions/" + id).subscribe(data=>{
      console.log("Data of transactio/id");
      console.log(data);
    this.immobilierService.setTransactionCurrent(data);
      console.log("getTransactionCurrent of transactio/id");
      console.log(this.immobilierService.getTransactionCurrent());

      this.transactionsImmobilier=data;

    },error=>{
      console.log(error);
    })*/

  }


  /*addToCart(p) {
    this.allImmobiliersCarts.push(p);
    this.cartService.setallImmobiliersCarts(this.allImmobiliersCarts);
  }*/
  ImmobilierAnn:ImmobilierAnn=new ImmobilierAnn();
  Imm:Immobilier=new Immobilier();
  transaction:transaction=new transaction();
  closeResult: string="";
  Buy(p: any) {
    this.Imm=p;
    this.ImmobilierAnn.ownerAdress=p.addressOwner;
    this.ImmobilierAnn.titre=p.titer;
    this.ImmobilierAnn.price=p.price;
    this.ImmobilierAnn.recipentAdress=localStorage.getItem('adresscurentuser');
    console.log(this.ImmobilierAnn);
  }
  transfertImmobilier(){
    this.transaction.addressOwner=this.Imm.addressOwner;
    this.transaction.price=this.ImmobilierAnn.price;
    this.transaction.addressrecipent=this.ImmobilierAnn.recipentAdress;
    this.contractService.TransferImmobilier(this.ImmobilierAnn).subscribe(res=>{
      if(res==false){
        let c=confirm("impossible (ton argent ne suffit pas) !!!");
        if (!c) return this.router.navigateByUrl("/home/"+this.transaction.addressrecipent);
        console.log("transaction Impossible");
      }
      else{
        this.immobilierService.changeOwner(this.Imm.id,this.ImmobilierAnn.recipentAdress).subscribe(
          res=>{
            console.log(res);
          }
        );
        this.transactionService.addTransaction(this.Imm.id,this.transaction).subscribe(res=>{
          console.log("traansaaaaaaactionnnnn");
          console.log(res);
        });
        console.log("transaction terminé");
        window.location.reload();
      }
    });
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
}
