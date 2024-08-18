// department-pie.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-department-pie',
  template: `
    <div class="chart-container">
      <h3>Funcionários por Setor</h3>
      <canvas
        baseChart
        [data]="pieChartData"
        [labels]="pieChartLabels"
        [options]="pieChartOptions"
        [chartType]="pieChartType"
      >
      </canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
        margin: 20px;
      }
    `,
  ],
})
export class DepartmentPieComponent implements OnInit {
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: string[] = ['TI', 'RH', 'Financeiro', 'Marketing'];
  pieChartType: ChartType = 'pie';
  pieChartData: number[] = [300, 500, 100, 200];

  ngOnInit(): void {}
}
