import { Component, OnInit } from '@angular/core';
import {ImmobilierService} from "../../services/immobilier.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'mg-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrls: ['./immobilier.component.scss']
})
export class ImmobilierComponent implements OnInit {


  immobiliers;
  immobilierCurrent ;
  transactionsImmobilier;
  id;

  public host:String = "http://localhost:8081";
  constructor(private immobilierService: ImmobilierService,private transactionService:TransactionService,
              //   private cartService: CartService,
              private router:Router,private route:ActivatedRoute) {

    //---------- for prond url de navigator a chaque chongment de se url---------------
    router.events.subscribe(event=>{
      if (event instanceof NavigationEnd){

        //console.log(this.route.snapshot.params.urlProds);
        // console.log("paramMap.get('lang') issss "+this.route.snapshot.paramMap.get('lang'));
        let url1 =  this.route.snapshot.url.pop();
        this.id=url1;
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
    this.ongetCurrentImmobilier();
    this.ongetCurrenTransactions();

  }
  ongetCurrentImmobilier(){
/*    this.immobilierCurrent=this.immobilierService.getimmobilierCurrent();
    console.log(this.immobilierCurrent);

    this.transactionsImmobilier=this.immobilierService.getTransactionCurrent();
    console.log(this.transactionsImmobilier);*/

    this.immobilierService.getRessource(this.host + "/getImmobilier/" + this.id).subscribe(data=>{
      console.log("dataCurrent");
      console.log(data);
      console.log("immobilierCurrent");
      this.immobilierCurrent=data;
      console.log(this.immobilierCurrent);
      console.log("immobilierCurrent");

    },error=>{
      console.log(error);
    })


  }
  ongetCurrenTransactions(){
;
 /* this.transactionsImmobilier=this.immobilierService.getTransactionCurrent();
    console.log("this.transactionsImmobilier = "+this.transactionsImmobilier);
    console.log(this.transactionsImmobilier);*/
    this.transactionService.getRessource(this.host + "/transactions/" + this.id).subscribe(data=>{
      console.log("Data of transactio/id");
      console.log(data);
      this.immobilierService.setTransactionCurrent(data);
      console.log("getTransactionCurrent of transactio/id");
      console.log(this.immobilierService.getTransactionCurrent());

      this.transactionsImmobilier=data;

    },error=>{
      console.log(error);
    })


  }


}
