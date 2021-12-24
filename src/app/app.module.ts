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
import { ReactiveFormsModule } from '@angular/forms';
import { AddPageComponent } from './components/add-page/add-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DeletionDialogComponent } from './components/deletion-dialog/deletion-dialog.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'edit-add', component: EditAddProfileComponent },
  { path: 'add', component: AddPageComponent },
  { path: 'assessment', component: AssessmentPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    EditAddProfileComponent,
    AssessmentPageComponent,
    HeaderComponent,
    AddPageComponent,
    DeletionDialogComponent,
  ],
  entryComponents: [DeletionDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
