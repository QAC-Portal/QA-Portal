import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { QaHelpService } from '../../_common/services/qa-help.service';

@Component({
  selector: 'app-portal-help-content',
  templateUrl: './portal-help-content.component.html',
  styleUrls: ['./portal-help-content.component.css']
})
export class PortalHelpContentComponent implements OnInit {
  @Input() currentUrl: string;
  message: string;
  constructor(private helpService: QaHelpService, private router: Router){
    this.helpService.currentMessage.subscribe(message => this.message = message);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.helpService.changeMessage();
      }
      
    })
  }
  
  change(){
  
  }

  
  ngOnInit() {
    this.helpService.currentMessage.subscribe(message => this.message = message);
  }

}
