import {RouterEvent} from '@angular/router';


export class MockNavigationEnd extends RouterEvent {
  
     id = 1;
     url = 'http://localhost:8080/cohort-api/manage/user';
     urlAfterRedirects = null;

    MockNavigationEnd(){
        this.id = 1;
        this.url = 'http://localhost:8080/cohort-api/manage/user';
        this.urlAfterRedirects = null;
    }


    public toString(): string{return "1,http://localhost:8080/cohort-api/manage/user',null"};
    
    
   
    
    
}

