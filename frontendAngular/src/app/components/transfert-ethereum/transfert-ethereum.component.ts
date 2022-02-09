import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ImmobilierService} from "../../services/immobilier.service";
import {ContractService} from "../../services/contract.service";

@Component({
  selector: 'mg-transfert-ethereum',
  templateUrl: './transfert-ethereum.component.html',
  styleUrls: ['./transfert-ethereum.component.scss']
})
export class TransfertEthereumComponent implements OnInit {

  adresscurentuser ;
  constructor( private router:Router,private route:ActivatedRoute,private immobilierService:ImmobilierService,private  contractService:ContractService) {

    //---------- for prond url de navigator a chaque chongment de se url---------------
    router.events.subscribe(event=>{
      if (event instanceof NavigationEnd){


        let url1 =  this.route.snapshot.url.pop();
        this.adresscurentuser=url1;

        console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai

      }
    })

  }
  ngOnInit(): void {
  }

  Transfert(Data: any) {
    console.log(this.adresscurentuser);
    console.log(Data);
    this.contractService.TransferEth(Data).subscribe(resp => {
      console.log(resp);

      if (resp==true){
        this.router.navigateByUrl("/home/"+this.adresscurentuser);
      }else{
        let c=confirm("impossible (ton argent ne suffit pas) !!!,Vous pouvez modifier le price ce que vous souhaitez envoyer ???");
        if (!c) return this.router.navigateByUrl("/home/"+this.adresscurentuser);
        else {
          this.router.navigateByUrl("/transfertEthereum/"+this.adresscurentuser);
        }
      }
    }, error => {
      console.log(error);
    })
  }
}
