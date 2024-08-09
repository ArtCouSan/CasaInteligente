import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';


@NgModule({
  declarations: [
    EmConstrucaoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    EmConstrucaoComponent
  ]
})
export class SharedModule { }
