import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './base.component';

export const routes: Routes = [
  {
    path: '',
    component: BaseComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BaseRoutingModule { }