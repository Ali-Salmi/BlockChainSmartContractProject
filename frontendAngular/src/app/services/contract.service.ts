import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import { Observable } from 'rxjs';
import { ImmobilierAnn } from '../models/immobilier-ann';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  adresscurentuser;
  public host1:String = "http://localhost:8083";
  constructor(private http:HttpClient,private authService:AuthenticationService) { }
  TransferEth(Data: any) {
    this.adresscurentuser=localStorage.getItem('adresscurentuser');
    return this.http.post(this.host1+"/transfertEher/"+this.adresscurentuser,Data);
  }
  TransferImmobilier(Data: any) {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.post(this.host1+"/transferImmobilier",Data,{headers:headers});
  }
  addImmobilier(Data: any) {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.post(this.host1+"/addImmobilier",Data,{headers:headers});
  }
  // transfertImmobilier(ImmobilierAnn:ImmobilierAnn){
  //   this.http.post(this.host1+"/transferImmobilier",ImmobilierAnn);
  // }
}
