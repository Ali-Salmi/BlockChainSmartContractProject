import { Component, OnInit } from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Router} from "@angular/router";
import {TransactionModelServer} from "../../models/transaction.model";

@Component({
  selector: 'mg-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions;
  immobilierCurrent ;

  public host:String = "http://localhost:8081";
  constructor(private transactionService: TransactionService,
              //   private cartService: CartService,
              private router:Router) {}

  ngOnInit(): void {
    this.ongetAllTransactions();
  }
  ongetAllTransactions(){

    this.transactionService.getAllTransactions().subscribe(data=>{
      console.log(data);
      this.transactions=data;
    },error=>{
      console.log(error);
    })
  }
  selectImmobilier(id) {
    this.transactionService.getRessource(this.host + "/getImmobilier/" + id).subscribe(data=>{
      console.log(data);
      this.immobilierCurrent=data;
      this.router.navigate(['/Immobilier',id]).then();
    },error=>{
      console.log(error);
    })

  }


}

