import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public host:String = "http://localhost:8080";
  constructor(private authService:AuthenticationService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
  }
  onRegister(data){
    console.log(data);
    this.authService.Register(data).subscribe(resp=>{
      console.log(resp);
      //console.log(resp.headers.get('Authorization'));
     // let jwt=resp.headers.get('Authorization');
     // this.authService.saveToken(jwt);
     // console.log("token is saved :");
     // console.log(this.authService.jwt);
    //  window.location.reload();//important for reload Confrim_page
    },error => {
      console.log(error);
    })


    this.router.navigateByUrl("/login");

  }
  isAdmin(){
    return this.authService.isAdmin();
  }
  isUser(){
    return this.authService.isUser();
  }





}
