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
export class HomepageComponent implements OnInit, OnDestroy {
  employees: object = { keys: [0] };
  search: string;
  // @Output() editProfileData = new EventEmitter<object>();
  // sendData(profileData: object) {
  //   this.editProfileData.emit;
  // }
  constructor(
    private employeesDataService: DataService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.employeesDataService.employeeData.subscribe((data) => {
      this.employees = data;
    });
    console.log('=====>', this.employees);
    this.employeesDataService.fetchUpdateData();
  }

  ngOnInit(): void {
    console.log('======', this.employees['keys']);
    // console.log(this.employeesDataService.employeeMasterData);
    // this.employees = this.employeesDataService.employeeMasterData;
    this.employeesDataService.employeeData.subscribe((data) => {
      this.employees = data;
    });
    console.log('=====>', this.employees);
  }
  removeEmployee(employee) {
    // console.log(employee);
    // console.log(this.employees[employee]);
    // this.employees['keys'].splice(this.employees['keys'].indexOf(employee), 1);
    // // console.log('....', this.employees);
    console.log('{........');
    this.employeesDataService.removeEmployee(employee);
    // delete this.employees[employee];
  }
  editProfile(profileData) {
    console.log('.........home page', profileData);
    this.employeesDataService.editProfileData = profileData;
  }
  openDialog(employee) {
    let dialogRef = this.dialog.open(DeletionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(Boolean(result));

      if (result == 'true') {
        this.removeEmployee(employee);
      }
    });
  }
  goToAddPage() {
    this.router.navigate(['./add']);
  }

  onChangeSearchData(event) {
    this.employeesDataService.findEmployee(this.search.toLowerCase());
  }
  ngOnDestroy(): void {}
}
