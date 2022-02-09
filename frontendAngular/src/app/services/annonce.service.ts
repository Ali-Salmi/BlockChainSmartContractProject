import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {ImmobilierService} from "./immobilier.service";

@Injectable({
  providedIn: 'root'
})
//Immobilier==annonce
export class AnnonceService {

  server_URL="http://localhost:8081";
  immobiliers;
  mode='list';
  constructor(private http:HttpClient,private immService:ImmobilierService ) { }

  //get all Immobilier from backend
  getAllImmobilier(){


  }
}
