import { element } from 'protractor';
import { Component, OnInit, Injectable }          from '@angular/core';
import { Router }                     from '@angular/router';

import { Observable, Subscription }   from 'rxjs/Rx';

import { AuthorizationService }       from '../../services/authorization.service';
import { UserService }                from '../../services/user.service';
import { TrazaService }               from '../../services/traza.service';
import { MessageService }             from '../../services/message.service';

import { TokenResponse }              from '../../interfaces/token-response';
import { UsersResponse}               from '../../interfaces/users-response';
import { MyUser }                     from '../../interfaces/my-user';
import { Authority }                  from '../../interfaces/users-response';
import { HeaderComponent } from '../header/header.component';

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
// @Injectable()
export class HomeComponent implements OnInit {

  subscription: Subscription;

  private islogged: boolean;

  mirespuesta  : any;

  mitoken      : TokenResponse;
  miuserall    : UsersResponse[];
  miusuario    : MyUser;

  user_name    : string;


  constructor( private router               : Router, 
               private AuthorizationService : AuthorizationService, 
               private UserService          : UserService,
               private TrazaService         : TrazaService,
               private MessageService       : MessageService,
               private HeaderComponent      : HeaderComponent
             ) 
  { }

  ngOnInit() {
    this.islogged = this.AuthorizationService.is_logged();
    
    this.whoami();
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  userall() {
    if (this.AuthorizationService.is_logged()) {
      this.UserService.userall()
        .subscribe(respuesta => {

          this.miuserall = respuesta;
          this.TrazaService.dato("HOME", "API USERALL OK", this.miuserall);
        },
          error => { this.TrazaService.error("HOME", "API USERALL KO", error); }
        );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  whoami() {
    if (this.AuthorizationService.is_logged()) {
      this.AuthorizationService.whoami()
        .subscribe(respuesta => {

          this.mirespuesta = respuesta;
          this.TrazaService.log("HOME", "API WHOAMI OK", "");

          // this.miusuario           = JSON.parse(localStorage.getItem("USER"));
          this.miusuario            = JSON.parse(sessionStorage.getItem("USER"));
         
          this.miusuario.firstname = this.mirespuesta.firstName;
          this.miusuario.lastname  = this.mirespuesta.lastName;
          this.miusuario.authorities = this.mirespuesta.authorities;
          console.log(this.miusuario.authorities);
          // localStorage.removeItem("USER");
          
          sessionStorage.removeItem("USER");
          // localStorage.setItem("USER", JSON.stringify(this.miusuario));
          sessionStorage.setItem("USER", JSON.stringify(this.miusuario));

          this.user_name = this.miusuario.firstname + " " + this.miusuario.lastname
          
          
          this.miusuario.authorities.forEach(element => {
            // console.log(element.authority);
            switch (element.authority) {
              case 'ROLE_USER':
                this.HeaderComponent.isUser = true;
                break;

              case 'ROLE_GESTOR':
                this.HeaderComponent.isGestor = true;
                break;

              case 'ROLE_ADMIN':
                this.HeaderComponent.isAdmin = true;
                break;
            
              default:
                break;
            }
          });
          console.log(sessionStorage.getItem("USER"));
        },
          error => { this.TrazaService.error("HOME", "API WHOAMI KO", error); }
        );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  refresh() {
    if (this.AuthorizationService.is_logged()) {
      this.AuthorizationService.refresh()
        .subscribe(respuesta => {

          this.mitoken = respuesta;
          this.TrazaService.log("HOME", "API REFRESH OK", "");

          this.miusuario       = JSON.parse(localStorage.getItem("USER"));
          this.miusuario       = JSON.parse(sessionStorage.getItem("USER"));
          this.miusuario.token = this.mitoken.access_token;

          // localStorage.removeItem("USER");
          // localStorage.setItem("USER", JSON.stringify(this.miusuario));

          sessionStorage.removeItem("USER");
          sessionStorage.setItem("USER", JSON.stringify(this.miusuario));
        },
          error => { this.TrazaService.error("HOME", "API REFRESH KO", error); }
        );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  change_password(oldpass: string, newpass: string) {
    if (this.AuthorizationService.is_logged()) {
      this.AuthorizationService.change_password(oldpass, newpass)
        .subscribe(respuesta => {

          this.mirespuesta = respuesta;
          this.TrazaService.log("HOME", "API CHANGE-PASSWORD OK", "");
        },
          error => { this.TrazaService.error("HOME", "API CHANGE-PASSWORD KO", error); }
        );
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  contains(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === b) {
            return true;
        }
    }
    return false;
  }
}
