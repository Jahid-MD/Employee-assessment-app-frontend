import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  employees: object;
  // @Output() editProfileData = new EventEmitter<object>();
  // sendData(profileData: object) {
  //   this.editProfileData.emit;
  // }
  constructor(private employeesDataService: DataService) {}

  ngOnInit(): void {
    // console.log(this.employeesDataService.employeeMasterData);
    // this.employees = this.employeesDataService.employeeMasterData;
    this.employeesDataService.employeeData.subscribe((data) => {
      this.employees = data;
    });
    console.log('=====>', this.employees);
  }
  removeEmployee(employee) {
    console.log(employee);
    console.log(this.employees[employee]);
    this.employees['keys'].splice(this.employees['keys'].indexOf(employee), 1);
    console.log(this.employees);
    delete this.employees[employee];
  }
  editProfile(profileData) {
    console.log('.........home page', profileData);
    this.employeesDataService.editProfileData = profileData;
  }
  ngOnDestroy(): void {}
}
