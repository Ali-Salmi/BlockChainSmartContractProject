import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "src/app/services/authentication.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { logins } from 'src/app/models/logins';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
public UsersAll;
Login:logins=new logins();
  public host:String = "http://localhost:8080";
  constructor(private authService:AuthenticationService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }
  onLogin(){
    console.log(this.Login);
  this.authService.login(this.Login).subscribe(resp=>{
     console.log(resp);
     console.log(resp.headers.get('Authorization'));
     let jwt=resp.headers.get('Authorization');
     this.authService.saveToken(jwt);
     console.log("token is saved :");
     console.log(this.authService.jwt);
     //window.location.reload();//important for reload Confrim_page
     window.location.href = 'ConfirmAdressUser';
   },error => {
     console.log(error);
   })


   // this.router.navigateByUrl("/ConfirmAdressUser");

}
  isAdmin(){
    return this.authService.isAdmin();
  }
  isUser(){
    return this.authService.isUser();
  }


  register() {
    window.location.href = 'register';
  }
}
