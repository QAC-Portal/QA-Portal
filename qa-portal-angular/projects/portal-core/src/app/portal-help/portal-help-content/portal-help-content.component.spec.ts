import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalHelpContentComponent } from './portal-help-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PortalHelpContentComponent', () => {
  let component: PortalHelpContentComponent;
  let fixture: ComponentFixture<PortalHelpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PortalHelpContentComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalHelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
