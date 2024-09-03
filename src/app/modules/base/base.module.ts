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

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent,
    ColaboradorComponent,
    DashboadComponent,
    AnaliseColaboradorComponent,
    PesquisaClimaComponent,
    PesquisaComponent
  ],
  imports: [CommonModule, BaseRoutingModule, FontAwesomeModule, SharedModule],
})
export class BaseModule { }
