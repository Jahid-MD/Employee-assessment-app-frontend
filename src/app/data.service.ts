import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  employeeMasterData: object = {};
  editProfileData: object;

  //Subject related employees data serviing all over the appp
  employeeData = new BehaviorSubject(this.employeeMasterData);

  constructor(private http: HttpClient, private router: Router) {
    //Http resquest on app getting start
    this.http.get('api/employees').subscribe((data) => {
      this.employeeData.next(data);
    });
  }
  //http request for sending newly added employee's data
  addEmployee(newEmployeeData) {
    this.http.post('/api/addEmployee', newEmployeeData).subscribe();
    this.router.navigate(['/']);
  }

  //http request for sending updated employee's data
  updateEmployee(employeeUpdateData) {
    this.http.put('/api/updateEmployee', employeeUpdateData).subscribe();
    this.fetchUpdateData();
    this.router.navigate(['/']);
  }

  //http request for deleting the employee from the data
  removeEmployee(employeeData) {
    this.http.delete(`/api/removeEmployee/${employeeData}`).subscribe();
    setTimeout(() => {
      this.fetchUpdateData();
    }, 300);
  }

  //http request for getting data after searching
  findEmployee(searchData) {
    this.http.get(`/api/employees/${searchData}`).subscribe((data) => {
      this.employeeMasterData = data;
      this.employeeData.next(data);
    });
  }

  //http for getting updated data after editing employee, employee deletion and adding new employee
  fetchUpdateData() {
    this.http.get('api/employees').subscribe((data) => {
      this.employeeData.next(data);
    });
  }
}
