import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QaHelpService {

  private messageSource = new BehaviorSubject(window.location.href);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(){
    this.messageSource.next(window.location.href);
  }
}
