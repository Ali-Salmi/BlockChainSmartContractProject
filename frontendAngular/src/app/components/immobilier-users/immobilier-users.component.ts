import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Immobilier } from 'src/app/models/immobilier';
import { ImmobilierAnn } from 'src/app/models/immobilier-ann';
import { transaction } from 'src/app/models/transaction';
import { ContractService } from 'src/app/services/contract.service';
import { ImmobilierService } from 'src/app/services/immobilier.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'mg-immobilier-users',
  templateUrl: './immobilier-users.component.html',
  styleUrls: ['./immobilier-users.component.scss']
})
export class ImmobilierUsersComponent implements OnInit {

  constructor(private transactionService:TransactionService,private contractService:ContractService,private modalService: NgbModal,private immobilierService:ImmobilierService ,private router:Router,private route:ActivatedRoute) {

    router.events.subscribe(event=>{
    if (event instanceof NavigationEnd){


    let url1 =  this.route.snapshot.url.pop();
    this.addressUser=url1;
    console.log("adresss: "+this.addressUser);
    //route.snapshot.url.push();
    console.log("adressUser issss "+url1);//hadi ana drtha hitach hadi this.route.snapshot.params.urlProds  mabghatch tghdam liai

  }
  })

  }
  userImmobiliers: Immobilier[] = [];
  addressUser;
  ngOnInit(): void {
    this.getUserImmobiliers();
  }

  getUserImmobiliers(){
    this.immobilierService.getImmobilierByAddress(this.addressUser).subscribe(data=>{
      this.userImmobiliers=data;
      console.log("listImmobilier");
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
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
        let c=confirm("impossible (ton argent ne suffit pas) !!!,Vous pouvez modifier le price ce que vous souhaitez envoyer ???");
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
