import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UsersService} from "./users.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2:string="http://localhost:8080";
  jwt:string;
  username:string;
  roles:Array<string>;

  constructor(private http:HttpClient,private router:Router) { }
  login(data){
    console.log("data in login service auth : "+data);
    return this.http.post(this.host2+"/login",data,{observe:'response'})//hadi observe kadjib reponse kamla machi ghir JSON
  }

  saveToken(jwt: string| null) {
    if (jwt!=null){

      localStorage.setItem('token',jwt);
      this.jwt=jwt;
      this.parseJWT();

    }

  }
  parseJWT(){
    let jwtHelper = new JwtHelperService();
    let ObjJwt= jwtHelper.decodeToken(this.jwt);
    this.username  =  ObjJwt.sub;
    this.roles  =  ObjJwt.roles;
    localStorage.setItem('username',ObjJwt.sub);
    console.log("username = "+this.username);
    console.log("roles = "+this.roles);
  }
  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }
  isUser(){
    return this.roles.indexOf('USER')>=0;
  }
  isAtheticated(){
    return (this.roles && (this.isUser() || this.isAdmin()));
  }

  loadToken() {
    // @ts-ignore
    this.jwt=localStorage.getItem('token');
    this.username=localStorage.getItem('username');
    this.parseJWT();
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('adresscurentuser');
    this. initParams();


   // window.location.href = 'login';
    this.router.navigateByUrl("/login");
  //  this.usersService.setAdressUserFromConfer(undefined);
  }
  initParams(){

    // @ts-ignore
    this.jwt=undefined;
    // @ts-ignore
    this.username=undefined;
    // @ts-ignore
    this.roles=undefined;
  }


  Register(data) {
    return this.http.post(this.host2+"/register",data,{observe:'response'})//hadi observe kadjib reponse kamla machi ghir JSON
  }
}
