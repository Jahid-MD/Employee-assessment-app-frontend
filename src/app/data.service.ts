import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { appData } from './employeeData';
import { quizData } from './quizData';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  employeeMasterData: object = {};
  quizMasterData: object = quizData;
  editProfileData: object;

  employeeData = new BehaviorSubject(this.employeeMasterData);
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('api/employees').subscribe((data) => {
      console.log(data);
      this.employeeData.next(data);
    });
  }

  fetchUpdateData() {
    this.http.get('api/employees').subscribe((data) => {
      this.employeeData.next(data);
    });
  }
  addEmployee(newEmployeeData) {
    console.log(newEmployeeData);
    this.http.post('/api/addEmployee', newEmployeeData).subscribe();
    this.router.navigate(['/']);
  }
  updateEmployee(employeeUpdateData) {
    this.http.put('/api/updateEmployee', employeeUpdateData).subscribe();
    this.router.navigate(['/']);
  }

  removeEmployee(employeeData) {
    console.log('delted employee........', employeeData);
    this.http
      .delete(`/api/removeEmployee/${employeeData}`)
      .subscribe((data) => {
        console.log(data);
      });
    this.fetchUpdateData();
  }
}
