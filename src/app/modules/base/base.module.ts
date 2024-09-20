import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base.routes';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { AnaliseColaboradorComponent } from './components/analise-colaborador/analise-colaborador.component';
import { PesquisaClimaComponent } from './components/pesquisa-clima/pesquisa-clima.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { PesquisaAnonimaComponent } from './components/pesquisa-anonima/pesquisa-anonima.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent,
    ColaboradorComponent,
    DashboadComponent,
    AnaliseColaboradorComponent,
    PesquisaClimaComponent,
    PesquisaComponent,
    PesquisaAnonimaComponent,
    QuestionarioComponent,
    LoginComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BaseRoutingModule, FontAwesomeModule, SharedModule],
})
export class BaseModule { }
