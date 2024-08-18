import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { ColaboradorEditComponent } from './modals/colaborador-edit/colaborador-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmarDelecaoComponent } from './modals/confirmar-delecao/confirmar-delecao.component';
import { DetalheAnaliseColaboradorComponent } from './modals/detalhe-analise-colaborador/detalhe-analise-colaborador.component';
import { TotalEmployeesComponent } from './graficos/total-employees/total-employees.component';
import { EmployeeTimelineComponent } from './graficos/employee-timeline/employee-timeline.component';
import { DepartmentPieComponent } from './graficos/department-pie/department-pie.component';
import { GenderBarComponent } from './graficos/gender-bar/gender-bar.component';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent,
    DetalheAnaliseColaboradorComponent,
    TotalEmployeesComponent,
    EmployeeTimelineComponent,
    DepartmentPieComponent,
    GenderBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BaseChartDirective,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent,
    DetalheAnaliseColaboradorComponent,
    TotalEmployeesComponent,
    EmployeeTimelineComponent,
    DepartmentPieComponent,
    GenderBarComponent
  ]
})
export class SharedModule { }
