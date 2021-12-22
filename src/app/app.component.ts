import { Component } from '@angular/core';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'employees-assessment-app';
  constructor() {}
  sendData(editProfileData: object) {
    console.log('........', editProfileData);
  }
}
