import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import { transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public host:String = "http://localhost:8081";
  constructor(private http:HttpClient,private authService:AuthenticationService ) { }

  getAllTransactions(){

    console.log('in getAllTransactions');

    return this.http.get(this.host+"/allTransactions");
  }
  getRessource(url){
    return this.http.get(url);
  }
  deleteRessource(url){
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log(' deleteRessource(url)'+'Bearer '+this.authService.jwt);
    console.log(' url =='+ url);

    return this.http.delete(url,{headers:headers});
  }
  postRessource(url,data){
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log(' deleteRessource(url)'+'Bearer '+this.authService.jwt);
    console.log(' url =='+ url);
    return this.http.post(url,data,{headers:headers});
  }

  editeRessource(url,data) {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log(' editeRessource(data)'+'Bearer '+this.authService.jwt);
    console.log(' url =='+ url);
    return this.http.put(url,data,{headers:headers});
  }
  addTransaction(id:number,transaction:transaction){
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.post(this.host+"/addTransaction/"+id,transaction,{headers:headers});
  }
}
