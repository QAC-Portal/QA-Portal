import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalHelpComponent } from './portal-help.component';
import { MatExpansionModule } from '@angular/material';
import { MockComponents } from 'ng-mocks';
import { PortalHelpContentComponent } from './portal-help-content/portal-help-content.component';
import { KeycloakService } from 'keycloak-angular';
import { MockKeycloakService } from '../_mocks/keycloak.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PortalHelpComponent', () => {
  let component: PortalHelpComponent;
  let fixture: ComponentFixture<PortalHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortalHelpComponent,
        MockComponents(PortalHelpContentComponent)
      ],
      imports: [
        MatExpansionModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: KeycloakService, useClass: MockKeycloakService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
