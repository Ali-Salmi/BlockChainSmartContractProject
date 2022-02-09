import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ImmobilierComponent } from './components/immobilier/immobilier.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import {LoginComponent} from "./components/login/login.component";
import {FormsModule} from "@angular/forms";
import { UsersComponent } from './components/users/users.component';
import { ConfirmAdressUserComponent } from './components/confirm-adress-user/confirm-adress-user.component';
import { MonImmobilierComponent } from './components/mon-immobilier/mon-immobilier.component';
import { RegisterComponent } from './components/register/register.component';
import { TransfertEthereumComponent } from './components/transfert-ethereum/transfert-ethereum.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ImmobilierUsersComponent } from './components/immobilier-users/immobilier-users.component';
import { ViewcartComponent } from './components/viewcart/viewcart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    AnnonceComponent,
    ThankyouComponent,
    ImmobilierComponent,
    TransactionComponent,
    LoginComponent,
    UsersComponent,
    ConfirmAdressUserComponent,
    MonImmobilierComponent,
    RegisterComponent,
    TransfertEthereumComponent,
    ImmobilierUsersComponent,
    ViewcartComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
