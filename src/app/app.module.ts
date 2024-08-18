import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TotalEmployeesComponent } from './total-employees/total-employees.component';
import { EmployeeTimelineComponent } from './employee-timeline/employee-timeline.component';
import { DepartmentPieComponent } from './department-pie/department-pie.component';
import { GenderBarComponent } from './gender-bar/gender-bar.component';
import { BaseChartDirective } from 'ng2-charts';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app.routes.modules';
import { SharedModule } from './modules/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TotalEmployeesComponent,
    EmployeeTimelineComponent,
    DepartmentPieComponent,
    GenderBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    BaseChartDirective,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
