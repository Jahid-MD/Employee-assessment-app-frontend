import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  formProfile: FormGroup;
  constructor(
    private dataService: DataService,
    private addForm: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formProfile = this.addForm.group({
      name: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      age: ['', [Validators.required, Validators.max(65), Validators.min(18)]],
      designation: ['', Validators.required],
      score: ['--'],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.snackBar.open('New Employee Added', 'Dismiss');

    //inokes addEmployee function of data service
    this.dataService.addEmployee(this.formProfile.value);

    //resets the form
    this.formProfile.reset({});
  }
}
