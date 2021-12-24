import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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

  ngOnInit(): void {}

  onSubmit() {
    let answers = [];
    let id = this.testFormProfile.value.employeeId;

    //separating answer data and employee's data
    for (let keys in this.testFormProfile.value) {
      if (keys != 'employeeId') {
        answers.push(this.testFormProfile.value[keys]);
      }
    }
    //resets form
    this.testFormProfile.reset({
      employeeId: [''],
    });

    //http request to send the answer data the backend
    this.http.put(`/api/updateScore/${id}`, { answers }).subscribe();

    this.snackBar.open('Assessment Submitted', 'Dismiss');
    this.router.navigate(['/']);
  }
}
