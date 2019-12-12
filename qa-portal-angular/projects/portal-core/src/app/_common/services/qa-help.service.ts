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

  private messageSource = new BehaviorSubject("");
  currentMessage = this.messageSource.asObservable();
  private helpContent;
  private userType;

  constructor(private router: Router, private http: HttpClient) { }

  getUserType(roleBool){
    if (roleBool == true){
      this.userType = "USER";
    } else {
      this.userType = "ADMIN";
    }
    return this.userType;
  }


  accessFile(): Observable <HelpModel>{
    return this.http.get<HelpModel>('../assets/Textfiles/homeHelp.json', {responseType: 'json'});
  }

changeMessage(data, tag){
  console.log(tag);
  data.subscribe(data => this.helpContent = data.filter(help => help.Tag == tag || help.Tag + String(tag).match(/[0-9]+/) == tag));
  data.subscribe(() => this.helpContent = this.helpContent[0].Help.split("\n"));
  data.subscribe(() => this.helpContent = this.helpContent.join("\n"));
  data.subscribe(() => this.messageSource.next(this.helpContent));
  };

  tooltipMaker(data){
    if (data == "Training"){
      return "Training at the academy";
    } else if (data == "Home") {
      return "Home Page";
    } else if (data == "Trainee Evaluation History") {
      return "View and edit your current evaluations of your courses at the academy, providing feedback to your trainer to help them improve in the future.";
    } else if (data == "Trainee Current CV") {
      return "Update and view your current CV which should include everything learnt at the academy.";
    } else if (data == "Trainee Reflections") {
      return "For viewing the history of your reflections at the academy";
    } else if (data == "Current Trainee Reflection") {
      return "A form to reflect over your progress at the academy at the current date";
    } else {
      return ""
    }
  }

}
