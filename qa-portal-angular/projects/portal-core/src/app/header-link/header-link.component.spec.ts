import { HeaderLinkComponent } from './header-link.component';


describe('HeaderLinkComponent', () => {
 
  let headerLinkComponent: HeaderLinkComponent;
  
  beforeEach(() => {
    headerLinkComponent = new HeaderLinkComponent;
  });

  it('should create', () => {
    expect(headerLinkComponent).toBeTruthy();
    console.log(headerLinkComponent);
  });
});
