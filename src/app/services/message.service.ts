
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class MessageService {

  constructor() 
  { }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  private subject_islogged = new Subject<boolean>();
  public obs_islogged$ = this.subject_islogged.asObservable();

  ///////////////////////////////////////////////////////////////////////////////////////

  login() {
    //console.log("message service login")
    this.subject_islogged.next(true);
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  logout() {
    //console.log("message service logout")
    this.subject_islogged.next(false);
  }

}