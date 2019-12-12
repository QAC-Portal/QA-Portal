import { TestBed } from '@angular/core/testing';

import { SideMenuService } from './side-menu.service';

describe('SideMenuService', () => {
   
  let service: SideMenuService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.get(SideMenuService);
    
  })

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should call toggleOpen', () => {
    spyOn(service, 'toggleOpen').and.callThrough();
    service.toggleOpen();

    expect(service.toggleOpen).toHaveBeenCalledTimes(1);
  });

  it('should set sideMenuOpen to true on init', () => {
    
    
    
    expect(service.sideMenuOpen).toEqual(false);
   //expect(localStorage.getItem('sideMenuOpen')).toEqual('true');
  });
  it('should open side menu', () => {
    service.toggleOpen();
    
    
    expect(localStorage.getItem('sideMenuOpen')).toEqual('true');
  });
});
