import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { UserService } from '../_common/services/user.service';
import { UserModel } from 'projects/portal-core/src/app/_common/models/user.model';
import { DataTableComponent } from 'projects/qa-common/src/app/data-table/data-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { UpdateUserCohortDialogComponent } from './update-user-cohort-dialog/update-user-cohort-dialog.component';
import { UpdateUserRoleDialogComponent } from './update-user-role-dialog/update-user-role-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('table', { static: false }) dataTable: DataTableComponent<UserModel>;

  public dataSource = new MatTableDataSource<UserModel>();
  public displayedColumns = ['select', 'Username', 'First Name', 'Last Name'];

  public searchInput = '';

  public isLoading = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.searchInput = this.activatedRoute.snapshot.queryParams.search || this.searchInput;
    this.performSearch();
  }

  public performSearch() {
    if (this.dataTable) { // Check if dataTable is defined. This isn't ready on first search (not that it matters)
      this.dataTable.deselectAllRows();
    }
    this.isLoading = true;
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { search: this.searchInput } });

    this.userService.searchUsers(this.searchInput).subscribe(results => {
      this.dataSource.data = results;
      this.isLoading = false;
    });
  }


  public onDeleteActionClicked() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.userService.deleteUsers(this.dataTable.getSelectedRowsData()).subscribe(() => {
          this.performSearch();
        });
      }
    });
  }

  public onUpdateCohortActionClicked() {
    const dialogRef = this.dialog.open(UpdateUserCohortDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.userService.updateUsersCohort(this.dataTable.getSelectedRowsData(), 'DUMMY_COHORT').subscribe(() => {
          this.performSearch();
        });
      }
    });
  }

  public onUpdateRoleActionClicked() {
    const dialogRef = this.dialog.open(UpdateUserRoleDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.userService.updateUsersRole(this.dataTable.getSelectedRowsData(), 'DUMMY_ROLE').subscribe(() => {
          this.performSearch();
        });
      }
    });
  }

  // editDialog(user: IUserModel): void {
  //   console.info(user);
  //   const dialogRef = this.dialog.open(EditUserDialogComponent, {
  //     ...this.modalConfig,
  //     data: user
  //   });
  //   dialogRef.componentInstance.dataChanged.subscribe(() => {
  //     if (dialogRef.componentInstance.data !== user && dialogRef.componentInstance.canSubmit) {
  //       this.service.updateUser(dialogRef.componentInstance.data);
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //   });
  // }

  // addDialog(): void {

  //   let dialogRef = this.dialog.open(AddUserDialogComponent, this.modalConfig);
  //   dialogRef.componentInstance.dataChanged.subscribe(() => {
  //     if (dialogRef.componentInstance.canSubmit) {
  //       this.service.addUser(dialogRef.componentInstance.data);
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //   });
  // }

  // deleteConfirmDialog(user: IUserModel): void {
  //   let dialogRef = this.dialog.open(DelUserConfirmDialogComponent, {
  //     ...this.modalConfig,
  //     data: user
  //   });

  //   dialogRef.componentInstance.dataChanged.subscribe(() => {
  //     if (dialogRef.componentInstance.canSubmit) {
  //       this.service.deleteUserByUsername(dialogRef.componentInstance.data.id);
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //   });
  // }


}
