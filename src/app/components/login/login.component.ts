import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';

import { UserService }           from './../../services/user.service';
import { AuthorizationService }  from './../../services/authorization.service';
import { TrazaService }          from './../../services/traza.service';
import { MessageService}         from './../../services/message.service';

import { TokenResponse }         from './../../interfaces/token-response';
import { UsersResponse }         from './../../interfaces/users-response';
import { MyUser }                from './../../interfaces/my-user';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

export class LoginComponent implements OnInit {

  mitoken      : TokenResponse;
  miusuario    : MyUser;

  constructor( private router               : Router, 
               private AuthorizationService : AuthorizationService, 
               private UserService          : UserService,
               private TrazaService         : TrazaService,
               private MessageService       : MessageService
             ) 
  { }


  ngOnInit() 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  login(user: string, password: string) {
    this.AuthorizationService.login(user, password)
      .subscribe(respuesta => {

        this.mitoken = respuesta;
        this.TrazaService.log("LOGIN", "API LOGIN OK", "")

        this.miusuario = { "user": user, "firstname": "", "lastname": "", "token": this.mitoken.access_token };
        localStorage.setItem("USER", JSON.stringify(this.miusuario));

        //https://github.com/xpoveda/oapc/blob/master/docs/multinotificacion_asincrona_entre_controles.pdf
        this.MessageService.login();

        this.router.navigateByUrl("/");
      },
        error => {
          localStorage.removeItem("USER");
          this.TrazaService.error("LOGIN", "API LOGIN KO", error);
        }
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////
}