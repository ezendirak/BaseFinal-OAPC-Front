
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
  private subject_haveModal = new Subject<boolean>();

  public obs_islogged$ = this.subject_islogged.asObservable();
  public obs_haveModal$ = this.subject_haveModal.asObservable();
  

  ///////////////////////////////////////////////////////////////////////////////////////

  login() {
    //console.log("message service login")
    this.subject_islogged.next(true);
    this.subject_haveModal.next
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  logout() {
    //console.log("message service logout")
    this.subject_islogged.next(false);
  }

}
