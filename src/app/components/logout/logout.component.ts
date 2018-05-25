import { HomeComponent } from './../home/home.component';
import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';

import { AuthorizationService }  from '../../services/authorization.service';
import { TrazaService }          from '../../services/traza.service';
import { MessageService }        from './../../services/message.service';
import { HeaderComponent } from '../header/header.component';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor( private router               : Router,
               private AuthorizationService : AuthorizationService,
               private TrazaService         : TrazaService,
               private MessageService       : MessageService,
               private HeaderComponent        : HeaderComponent
              ) 
  { }

  ngOnInit() {
    

    setTimeout(() => this.logout(), 0);
    
  }

  //////////////////////////////////////////////////////////////////////////////////////

  logout() {
    // setTimeout(() =>  this.HeaderComponent.isAdmin = false,
    // this.HeaderComponent.isGestor = false,
    // this.HeaderComponent.isUser = false, 0)
    
    if (this.AuthorizationService.is_logged()) {
      
      //https://github.com/xpoveda/oapc/blob/master/docs/multinotificacion_asincrona_entre_controles.pdf
      this.MessageService.logout();

      this.router.navigateByUrl("/login");
      this.AuthorizationService.logout();
      
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

}
