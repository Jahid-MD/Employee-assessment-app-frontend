import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DeletionDialogComponent } from '../deletion-dialog/deletion-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  //this variable stores all fetched data of employees
  employees: object = { keys: [] };

  emptyKeys: Boolean = false;
  //stores data searched employees name
  search: string;

  //mouse over the employee card;
  mouseOver: boolean = false;
  constructor(
    private employeesDataService: DataService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.employeesDataService.employeeData.subscribe((data) => {
      this.employees = data;
    });

    // to make a http call if data of homepage is not updated
    this.employeesDataService.fetchUpdateData();

    //display condition when there is no employees data available
    this.checkEmployeesAvailable();
  }

  ngOnInit(): void {}

  removeEmployee(employee) {
    this.employeesDataService.removeEmployee(employee);
    this.checkEmployeesAvailable();
  }

  editProfile(profileData) {
    this.employeesDataService.editProfileData = profileData;
  }

  //opening of dialog box confirming deletion
  openDialog(employee) {
    let dialogRef = this.dialog.open(DeletionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.removeEmployee(employee);
      }
    });
  }

  //on clicking add employee button
  goToAddPage() {
    this.router.navigate(['./add']);
  }

  onChangeSearchData() {
    this.employeesDataService.findEmployee(this.search.toLowerCase());
  }
  checkEmployeesAvailable() {
    setTimeout(() => {
      if (this.employees['keys'].length) {
        this.emptyKeys = false;
      } else {
        this.emptyKeys = true;
      }
    }, 2000);
  }
}
