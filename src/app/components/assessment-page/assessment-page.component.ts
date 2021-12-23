import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-assessment-page',
  templateUrl: './assessment-page.component.html',
  styleUrls: ['./assessment-page.component.scss'],
})
export class AssessmentPageComponent implements OnInit {
  quizData: object = { keys: [] };
  employeesName: string[];
  scoreData: object;
  constructor(
    private quizDataService: DataService,
    private assessmentForm: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.http.get('./api/quizData').subscribe((data) => {
      console.log(data);
      this.quizData = data;
    });
    this.quizDataService.employeeData.subscribe((data) => {
      this.employeesName = data['keys'];
    });
  }

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
    console.log('=====> quiz data', this.quizData);

    console.log('employees-------', this.employeesName);
  }
  onSubmit() {
    let answers = [];
    let id = this.testFormProfile.value.employeeId;
    console.log('id...............', id);
    for (let keys in this.testFormProfile.value) {
      if (keys != 'employeeId') {
        answers.push(this.testFormProfile.value[keys]);
      }
    }
    // this.scoreData = {
    //   id: this.testFormProfile.value.employeeId,
    //   ans: answers,
    // };
    // this.quizDataService.updateScore(this.scoreData);
    // // this.testFormProfile.reset({
    // //   employeeId: [''],
    // // });

    this.http.put(`/api/updateScore/${id}`, { answers }).subscribe();
    this.testFormProfile.reset({
      employeeId: [''],
    });
    this.router.navigate['/'];
  }
}
