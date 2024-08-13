import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { ColaboradorEditComponent } from './modals/colaborador-edit/colaborador-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmarDelecaoComponent } from './modals/confirmar-delecao/confirmar-delecao.component';


@NgModule({
  declarations: [
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    EmConstrucaoComponent,
    ColaboradorEditComponent,
    ConfirmarDelecaoComponent
  ]
})
export class SharedModule { }
