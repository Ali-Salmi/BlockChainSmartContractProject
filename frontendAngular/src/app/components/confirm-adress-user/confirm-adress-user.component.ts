import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'mg-confirm-adress-user',
  templateUrl: './confirm-adress-user.component.html',
  styleUrls: ['./confirm-adress-user.component.scss']
})
export class ConfirmAdressUserComponent implements OnInit {

  adresscurentuserData;
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {

    this.getAdresssByUserName();
    this.getAdressUserCurrent();
  }
  getAdressUserCurrent(){
    //window.location.reload();
    console.log("addddddddddd");

      this.adresscurentuserData=this.usersService.adresscurentuser;
    console.log("this.adresscurentuserData : "+this.adresscurentuserData);
    //window.location.reload();
  }

  YesConf(adresscurentuserData) {

 this.usersService.setAdressUserFromConfer(adresscurentuserData);
  }
  getAdresssByUserName(){
    /*    this.alluserData._embedded.appUsers.forEach(function (value) {
          console.log(value);
        });*/
    //  this.allUsers=this.alluserData._links.self.href;//.appUsers.username
    //  console.log(this.allUsers);
    // this.adresscurentuser= this.userService.getAdressbyUsername();
    console.log("getAdresssByUserNameooooooooo");
      this.usersService.getAdressbyUsername().subscribe(data=>{
        console.log("getAdresssByUserNameeeeeeeeee");
        console.log(data);
        console.log("getAdresssByUserNameeeeeeeeee");
        this.adresscurentuserData=data;
      },error=>{

     //   this.adresscurentuserData=error;
        console.log(error);

    })
  }
}
