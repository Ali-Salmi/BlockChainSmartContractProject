import { Component, OnInit } from '@angular/core';
import {ImmobilierService} from "../../services/immobilier.service";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {



/*import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ImmobilierService} from "../immobilier.service";

@Component({
  selector: 'app-immobilier',
  templateUrl: './immobilier.component.html',
  styleUrls: ['./immobilier.component.css']
})
export class ImmobilierComponent implements OnInit {

  constructor(private immService:ImmobilierService,private router:Router) { }
  immobiliers;
  transactions;
  currentImmobiliers;


  ngOnInit(): void {
    this.immService.getAllImmobiliers().subscribe(data=>{
      this.immobiliers=data;
      console.log(data);
    },err => {
      console.log(err);
    })
  }
  onGetProduits(cat){
    this.currentImmobiliers=cat;
    console.log(cat._links.transactions.href);
    /!* this.catService.getRessource(cat._links.products.href).
       subscribe(data=>{
       this.categories=data;
     },err => {
       console.log(err);
     })*!/
    let  url=cat._links.transactions.href;
    //this.router.navigateByUrl("/products/"+btoa(url));
    this.router.navigateByUrl("/transactions/"+btoa(url));
  }

}*/
////////////////////////////////////////////////////
  immobiliers;
  mode='list';
  constructor(private immService:ImmobilierService) { }

  ngOnInit(): void {
    this.ongetAllImmobilier();
  }
  ongetAllImmobilier(){
    this.immService.getAllImmobiliers().subscribe(data=>{
      console.log(data);
      this.immobiliers=data;
    },error=>{
      console.log(error);
    })
  }

  onDeleteCat(cat) {
    let c=confirm("etes vous sure ?");
    if (!c) return;
    this.immService.deleteRessource(cat._links.self.href).subscribe(data=>{
      this.mode='list';
      this.ongetAllImmobilier();
    },error => {
      console.log(error);
    })

  }

  onNewcat() {
    this.mode='new-cat';
  }

  onSaveCat(data) {
    console.log(data);
    let url = this.immService.host + "/immobiliers";
    this.immService.postRessource(url,data).subscribe(data=>{
      this.mode='list';
      this.ongetAllImmobilier();
    },error=>{
      console.log(error);
    })
  }

  currentImmobilier;
  onEditCat(cat) {
    console.log(cat);
    console.log(cat._links.self.href);
    this.immService.getRessource(cat._links.self.href).subscribe(data=>{
      this.mode='edit-cat';
      console.log(data);
      this.currentImmobilier=data;

    },error=>{
      console.log(error);
    })
  }

  onUpdateCat(data) {
    console.log(data);
    let url = this.currentImmobilier._links.self.href;
    this.immService.editeRessource(url,data).subscribe(data=>{
      this.mode='list';
      this.ongetAllImmobilier();
    },error=>{
      console.log(error);
    })
  }
}


