import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from './Employee';
import { appData } from './employeeData';
import { quizData } from './quizData';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  employeeMasterData: object = appData;
  quizMasterData: object = quizData;
  editProfileData: object;

  employeeData = new BehaviorSubject(this.employeeMasterData);
  constructor() {}

  addEmployee(newEmployeeData) {
    let keys = this.employeeMasterData['keys'];
    keys = keys[keys.length - 1];
    let id = Number(keys.split('emp')[1]) + 1;
    newEmployeeData['id'] = 'emp' + id;
    console.log(newEmployeeData);
    this.employeeMasterData['emp' + id] = newEmployeeData;
    this.employeeMasterData['keys'].push('emp' + id);
    console.log(this.employeeMasterData);
  }
  updateEmployee(employeeUpdateData) {
    this.employeeMasterData[employeeUpdateData['id']] = {
      ...employeeUpdateData,
    };
    console.log(this.employeeMasterData[employeeUpdateData['id']]);
    console.log(this.employeeMasterData);
  }
}
