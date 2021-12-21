import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EditAddProfileComponent } from './components/edit-add-profile/edit-add-profile.component';
import { AssessmentPageComponent } from './components/assessment-page/assessment-page.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'edit-add', component: EditAddProfileComponent },
  { path: 'assessment', component: AssessmentPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EditAddProfileComponent,
    AssessmentPageComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
