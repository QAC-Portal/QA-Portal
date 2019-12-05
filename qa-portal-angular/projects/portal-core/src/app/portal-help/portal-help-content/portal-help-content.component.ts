import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-help-content',
  templateUrl: './portal-help-content.component.html',
  styleUrls: ['./portal-help-content.component.css']
})
export class PortalHelpContentComponent implements OnInit {
  @Input() currentUrl: string;

  

  

  constructor() {
    
   }

  ngOnInit() {

  }

}
