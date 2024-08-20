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
import { BaseChartDirective } from 'ng2-charts';
import { G1Component } from './graficos/g1/g1.component';
import { G2Component } from './graficos/g2/g2.component';
import { G3Component } from './graficos/g3/g3.component';
import { G4Component } from './graficos/g4/g4.component';
import { G5Component } from './graficos/g5/g5.component';
import { G6Component } from './graficos/g6/g6.component';
import { G7Component } from './graficos/g7/g7.component';
import { G8Component } from './graficos/g8/g8.component';

@NgModule({
  declarations: [
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent,
    DetalheAnaliseColaboradorComponent,
    G1Component,
    G2Component,
    G3Component,
    G4Component,
    G5Component,
    G6Component,
    G7Component,
    G8Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BaseChartDirective,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent,
    DetalheAnaliseColaboradorComponent,
    G1Component,
    G2Component,
    G3Component,
    G4Component,
    G5Component,
    G6Component,
    G7Component,
    G8Component
  ],
})
export class SharedModule {}
