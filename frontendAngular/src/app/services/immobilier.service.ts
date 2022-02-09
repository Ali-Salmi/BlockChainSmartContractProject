import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Immobilier} from "../models/immobilier";


@Injectable({
  providedIn: 'root'
})
export class ImmobilierService {
  public host:String = "http://localhost:8081";
  public host1:String = "http://localhost:8083";
  constructor(private http:HttpClient,private authService:AuthenticationService,private router:Router) { }
  immobilierCurrent ;
  monImmobilierCurrent;
  TransactionOfImmobilierCurrent;
  getAllImmobiliers(){

    console.log('in getAllImmobiliers');

    return this.http.get(this.host+"/allImmobilier");
  }
  getAllImmobiliersnotProved(){
    return this.http.get(this.host+"/listImmobilierNotProved");
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
  getimmobilierCurrent(){
    return this.immobilierCurrent;
  }
  setimmobilierCurrent(data){
    this.immobilierCurrent=data;
  }
  getTransactionCurrent(){
    console.log(this.TransactionOfImmobilierCurrent);
    return this.TransactionOfImmobilierCurrent;
  }


  getmonImmobiliersAdress() {
    return this.monImmobilierCurrent;
  }
  setmonImmobiliersAdress(monImmobilierCurrent) {
     this.monImmobilierCurrent=monImmobilierCurrent;
  }
  ///////////////
  setTransactionCurrent(data){
    this.TransactionOfImmobilierCurrent=data;

  }
  ChangeAnnonceImmobilier(id){
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log('ChangeAnnonceImmobilier(id) : '+'Bearer '+this.authService.jwt);
    console.log(' id =='+ id);
    console.log(this.host+"/changeAnnouncement/"+"1");

    return this.http.get(this.host+"/changeAnnouncement/"+id,{headers:headers});
  }

/*  TransferEth(Data: any, adresscurentuser) {
    return this.http.post(this.host1+"/transfertEher/"+adresscurentuser,Data);
  }*/

  loadpage() {

    window.location.reload();
  }

  deleteImmobilier(id) {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.delete(this.host+"/deleteImobilier/"+id,{headers:headers});
  }

  confirmerdeleteImmobilier(id) {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log(this.authService.jwt);
    return this.http.put(this.host+"/proveAnnouncement/"+id,id,{headers:headers});
  }
  addImmobilier(data){
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log(' deleteRessource(url)'+'Bearer '+this.authService.jwt);
    return this.http.post(this.host+"/saveImmobilier",data,{headers:headers});
  }

  getImmobilierByPrice(addres:any,price:any):Observable<Immobilier[]>{
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get<Immobilier[]>(this.host+"/listImmobilierByPrice/"+price+"/"+addres,{headers:headers});
  }

  getImmobilierByid(id:number): Observable<Immobilier> {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get<Immobilier>(this.host+"/getImmobilierbyid/"+id,{headers:headers});
  }
  getImmobilierByAddress(address:string): Observable<Immobilier[]> {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get<Immobilier[]>(this.host+"/listImmobilier/"+address,{headers:headers});
  }
  changeOwner(id:number,newOwner:string):Observable<string>{
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.put<string>(this.host+"/changeOwner/"+id,newOwner,{headers:headers});
  }
  immobilierForHomePage(address:string):Observable<Immobilier[]>{
    return this.http.get<Immobilier[]>(this.host+"/listImmobilierForHomePage/"+address);
  }
  setPrice(id:number,imm:Immobilier):Observable<Immobilier>{
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    console.log("id: "+id+", price: "+imm.price);
    return this.http.put<Immobilier>(this.host+"/setPrice/"+id,imm,{headers:headers});
  }
  getMaxPrice(address:any){
    return this.http.get(this.host+"/getMaxPrice/"+address);
  }
}
