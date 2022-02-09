import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ImmobilierService} from "./immobilier.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public adresscurentuser:String;
  public UsersAll;
  public usernamecurrent;
  public host:String = "http://localhost:8080";
  constructor(private authService:AuthenticationService,private router:Router,private http:HttpClient,private immobilierService:ImmobilierService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getCurrentAdressUser();
  }
  getAllUsers(){
    console.log(this.authService.jwt);
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get(this.host+"/appUsers",{headers:headers});
  }
  getRoleUserbyId(id){
    console.log(this.authService.jwt);
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get(this.host+"/appUsers/"+id+"/roles",{headers:headers});
  }
  getAdressbyUsername(){

    console.log(this.authService.jwt);
    console.log("Username getAdressbyname : "+this.authService.username);
    this.usernamecurrent=this.authService.username;
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get(this.host+"/getAdresssByUserName/"+this.authService.username,{headers:headers});
  }
 setAdressUserFromConfer(adress){
    this.adresscurentuser=adress;
    console.log("adresssCurentfinalByConferm :  ")
    console.log(this.adresscurentuser);
    this.router.navigateByUrl("/home/"+this.adresscurentuser);
  // this.router.createUrlTree(['/home', this.adresscurentuser]);
 }
 getCurrentAdressUser(){
  //  this.immobilierService.setMonImmobilier(this.adresscurentuser);
    return this.adresscurentuser;
 }


}
