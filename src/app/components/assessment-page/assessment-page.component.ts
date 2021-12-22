import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-assessment-page',
  templateUrl: './assessment-page.component.html',
  styleUrls: ['./assessment-page.component.scss'],
})
export class AssessmentPageComponent implements OnInit {
  constructor(private quizDataService: DataService) {}
  quizData: object;
  employeesName: string[];
  ngOnInit(): void {
    this.quizData = this.quizDataService.quizMasterData;
    console.log('=====> quiz data', this.quizData);
    this.employeesName = this.quizDataService.employeeMasterData['keys'];
    console.log('employees', this.employeesName);
  }
}
