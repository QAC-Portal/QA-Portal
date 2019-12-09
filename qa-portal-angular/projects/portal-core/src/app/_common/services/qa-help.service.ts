import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HelpModel } from '../models/help-model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QaHelpService {

  private messageSource = new BehaviorSubject("Help");
  currentMessage = this.messageSource.asObservable();
  private helpContent;

  constructor(private router: Router, private http: HttpClient) { }

  accessFile(): Observable<HelpModel>{
    this.messageSource.next("Test");
    return this.http.get<HelpModel>('../assets/Textfiles/homeHelp.json');
  }

  changeMessage(data, tag){
    data.subscribe((data) => console.log(data));
    data.subscribe((data) => this.helpContent = (data));
    console.log(this.helpContent);
  };

  

  private homeHelp;
  private trainingHelp;
}
