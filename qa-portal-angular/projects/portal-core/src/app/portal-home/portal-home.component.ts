import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../_common/services/application.service';
import { SideMenuService } from '../_common/services/side-menu.service';

@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-home.component.html',
  styleUrls: ['./portal-home.component.scss']
})
export class PortalHomeComponent implements OnInit {

  constructor(
    public sideMenuService: SideMenuService,
    public appService: ApplicationService
  ) { }

  ngOnInit() {
  }

}
