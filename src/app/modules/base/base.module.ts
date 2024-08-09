import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { SharedModule } from '../shared/shared.module';
import { BaseRoutingModule } from './base.routes';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class BaseModule { }
