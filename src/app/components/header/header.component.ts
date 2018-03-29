import { Observable, Subscription } from 'rxjs/Rx';

import { Component, OnInit }        from '@angular/core';

import { AuthorizationService }     from '../../services/authorization.service';
import { TrazaService }             from '../../services/traza.service';
import { MessageService }           from './../../services/message.service';

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

export class HeaderComponent implements OnInit {

  subscription:        Subscription;

  private islogged;
  private isCollapsed: boolean;

  constructor(private AuthorizationService : AuthorizationService,
              private TrazaService         : TrazaService,
              private MessageService       : MessageService
            ) 
  { }

  ngOnInit() {
    // https://github.com/xpoveda/oapc/blob/master/docs/multinotificacion_asincrona_entre_controles.pdf
    // https://github.com/angular/angular/issues/17572
    this.subscription = this.MessageService.obs_islogged$.subscribe(
      islogged => setTimeout(() => this.islogged = islogged, 0)
    )

    this.isCollapsed = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ////////////////////////////////////////////////////////////////////////////////////////

}
