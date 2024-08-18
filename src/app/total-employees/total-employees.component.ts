// total-employees.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-employees',
  template: `
    <div class="card">
      <h3>Total de Funcionários</h3>
      <p>{{ totalEmployees }}</p>
    </div>
  `,
  styles: [
    `
      .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin: 20px;
        text-align: center;
      }
    `,
  ],
})
export class TotalEmployeesComponent implements OnInit {
  totalEmployees = 1000; // Valor fictício, pode ser substituído por uma chamada de API

  ngOnInit(): void {}
}
