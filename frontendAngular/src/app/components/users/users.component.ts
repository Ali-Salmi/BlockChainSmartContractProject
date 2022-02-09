import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ImmobilierModelServer} from "../../models/immobilier.model";
import {AuthenticationService} from "../../services/authentication.service";
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'mg-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  allUsers;
  alluserData;
  rolesUsercurrent;
  public adresscurentuser;
  public adressStringOfUser;
  constructor(private userService:UsersService,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {

    this.getAllUsers();
    this.getAdresssByUserName();
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe(data=>{
      console.log(data);
      this.alluserData=data;
    //  console.log(this.alluserData);
    },error=>{
      console.log(error);
    })
this.rolesUsercurrent=this.authenticationService.roles;

  }
  getAdresssByUserName() {
    this.adresscurentuser=this.userService.adresscurentuser;
  }

  onDeleteCat(c: any) {

  }

  onEditCat(c: any) {

  }
}
