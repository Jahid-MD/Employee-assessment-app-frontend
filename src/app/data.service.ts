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
    this.employeeMasterData[employeeUpdateData['id']] = {
      ...employeeUpdateData,
    };
    console.log(this.employeeMasterData[employeeUpdateData['id']]);
    console.log(this.employeeMasterData);
  }
  updateScore(scoreData) {
    console.log(scoreData);
    let count = 0;
    let answerArr = scoreData['ans'];
    let correctAns = this.quizMasterData['ans'];
    for (let i = 0; i < 10; i++) {
      if (answerArr[i]) {
        if (answerArr[i] == correctAns[i]) {
          count = count + 1;
        }
      }
    }
    this.employeeMasterData[scoreData.id]['score'] = count;
    console.log(this.employeeMasterData[scoreData.id]);
  }
}
