import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  formProfile = this.addForm.group({
    name: ['', Validators.required],
    // phoneNumber: [
    //   '',
    //   [Validators.maxLength(10), Validators.minLength(10), Validators.required],
    // ],
    phoneNumber: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.minLength(10)],
    ],
    age: ['', [Validators.required, Validators.max(65), Validators.min(18)]],
    designation: ['', Validators.required],
    score: ['N/A'],
  });
  constructor(private dataService: DataService, private addForm: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.formProfile.value);
    this.dataService.addEmployee(this.formProfile.value);
    this.formProfile.reset({
      name: [''],
      phoneNumber: [''],
      age: [''],
      designation: [''],
    });
  }
}
