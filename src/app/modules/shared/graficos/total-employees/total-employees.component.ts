// total-employees.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-employees',
  templateUrl: './total-employees.component.html',
  styleUrl: './total-employees.component.scss'
})
export class TotalEmployeesComponent implements OnInit {

  totalEmployees = 1000; // Valor fictício, pode ser substituído por uma chamada de API

  ngOnInit(): void {}
}
