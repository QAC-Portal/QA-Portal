export class MockSideMenuService {
  public sideMenuOpen = false;

  public toggleOpen(): boolean {
    this.sideMenuOpen = !this.sideMenuOpen;
    return this.sideMenuOpen;
  }

  public setOpenState(open: boolean): boolean {
    this.sideMenuOpen = open;
    return this.sideMenuOpen;
  }
}
