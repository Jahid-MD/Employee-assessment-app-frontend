import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-assessment-page',
  templateUrl: './assessment-page.component.html',
  styleUrls: ['./assessment-page.component.scss'],
})
export class AssessmentPageComponent implements OnInit {
  constructor(
    private quizDataService: DataService,
    private assessmentForm: FormBuilder
  ) {}
  quizData: object;
  employeesName: string[];
  scoreData: object;
  testFormProfile = this.assessmentForm.group({
    employeeId: ['', Validators.required],
    ques0: [null],
    ques1: [null],
    ques2: [null],
    ques3: [null],
    ques4: [null],
    ques5: [null],
    ques6: [null],
    ques7: [null],
    ques8: [null],
    ques9: [null],
  });
  ngOnInit(): void {
    this.quizData = this.quizDataService.quizMasterData;
    console.log('=====> quiz data', this.quizData);
    this.employeesName = this.quizDataService.employeeMasterData['keys'];
    console.log('employees', this.employeesName);
  }
  onSubmit() {
    let answers = [];
    for (let keys in this.testFormProfile.value) {
      if (keys != 'employeeId') {
        answers.push(this.testFormProfile.value[keys]);
      }
    }
    this.scoreData = {
      id: this.testFormProfile.value.employeeId,
      ans: answers,
    };
    this.quizDataService.updateScore(this.scoreData);
    this.testFormProfile.reset({
      employeeId: [''],
    });
  }
}
