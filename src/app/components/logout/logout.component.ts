import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';

import { AuthorizationService }  from '../../services/authorization.service';
import { TrazaService }          from '../../services/traza.service';
import { MessageService }        from './../../services/message.service';

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
               private MessageService       : MessageService
              ) 
  { }

  ngOnInit() {
    this.logout();
  }

  //////////////////////////////////////////////////////////////////////////////////////

  logout() {
    if (this.AuthorizationService.is_logged()) {

      this.AuthorizationService.logout();

      //https://github.com/xpoveda/oapc/blob/master/docs/multinotificacion_asincrona_entre_controles.pdf
      this.MessageService.logout();

      this.router.navigateByUrl("/login");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

}
