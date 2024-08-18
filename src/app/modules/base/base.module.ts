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

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent,
    ColaboradorComponent,
<<<<<<< HEAD
    DashboadComponent,
=======
    AnaliseColaboradorComponent,
    DashboadComponent
>>>>>>> 7eefb137583ca05c949dbf5b43f9942911aa3300
  ],
  imports: [CommonModule, BaseRoutingModule, FontAwesomeModule, SharedModule],
})
export class BaseModule {}
