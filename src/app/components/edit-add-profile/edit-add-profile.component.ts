import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-add-profile',
  templateUrl: './edit-add-profile.component.html',
  styleUrls: ['./edit-add-profile.component.scss'],
})
export class EditAddProfileComponent implements OnInit {
  profileData: object;
  formProfile = this.editAddForm.group({
    id: [''],
    name: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],

    age: ['', [Validators.required, Validators.max(65), Validators.min(18)]],
    designation: ['', Validators.required],
  });
  constructor(
    private dataService: DataService,
    private editAddForm: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileData = this.dataService.editProfileData;
    console.log('profile data', this.profileData);
    if (this.profileData != undefined) {
      this.formProfile.patchValue({
        id: this.profileData['id'],
        name: this.profileData['name'],
        phoneNumber: this.profileData['phoneNumber'],
        age: this.profileData['age'],
        designation: this.profileData['designation'],
      });
    }
  }

  onSubmit() {
    console.log(this.formProfile.value);
    this.snackBar.open('Update Employee', 'Dismiss');
    this.updateEmployee(this.formProfile.value);
    this.formProfile.reset({
      name: [''],
      phoneNumber: [''],
      age: [''],
      designation: [''],
    });
  }

  updateEmployee(employeeUpdateData) {
    this.dataService.updateEmployee(employeeUpdateData);
  }
}
