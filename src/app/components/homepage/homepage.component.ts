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
  employees: object = { keys: [] };
  search: string;

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

    this.employeesDataService.employeeData.subscribe((data) => {
      this.employees = data;
    });
    console.log('=====>', this.employees);
  }
  removeEmployee(employee) {
    console.log('{........');
    this.employeesDataService.removeEmployee(employee);
  }
  editProfile(profileData) {
    this.employeesDataService.editProfileData = profileData;
  }
  openDialog(employee) {
    let dialogRef = this.dialog.open(DeletionDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
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
}
