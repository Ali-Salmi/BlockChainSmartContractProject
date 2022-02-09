import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AnnonceComponent} from "./components/annonce/annonce.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import {ImmobilierComponent} from "./components/immobilier/immobilier.component";
import {TransactionComponent} from "./components/transaction/transaction.component";
import {LoginComponent} from "./components/login/login.component";
import {UsersComponent} from "./components/users/users.component";
import {ConfirmAdressUserComponent} from "./components/confirm-adress-user/confirm-adress-user.component";
import {MonImmobilierComponent} from "./components/mon-immobilier/mon-immobilier.component";
import {RegisterComponent} from "./components/register/register.component";
import {TransfertEthereumComponent} from "./components/transfert-ethereum/transfert-ethereum.component";
import { ImmobilierUsersComponent } from './components/immobilier-users/immobilier-users.component';
import { ViewcartComponent } from './components/viewcart/viewcart.component';



const routes: Routes = [
  {
    path: 'home/:adressUser', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'annonce/:id', component: AnnonceComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'transfertEthereum/:adressUser', component: TransfertEthereumComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'Immobilier/:id', component: ImmobilierComponent
  },
  {
    path: 'transaction', component: TransactionComponent
  },

  {
    path: 'ConfirmAdressUser', component: ConfirmAdressUserComponent
  },
  {
    path: 'monImmobilier/:adressUser', component: MonImmobilierComponent
  },
  {
    path:'immobilierUser/:adress',component: ImmobilierUsersComponent
  },
  {
    path:'allimmobiliernotproved/:adress',component: ViewcartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
