// employee-timeline.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-employee-timeline',
  template: `
    <div class="chart-container">
      <h3>Entradas por Ano</h3>
      <canvas
        baseChart
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [legend]="true"
        [chartType]="lineChartType"
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
export class EmployeeTimelineComponent implements OnInit {
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLabels: string[] = ['2018', '2019', '2020', '2021', '2022'];
  lineChartType: ChartType = 'line';
  lineChartData = [{ data: [65, 59, 80, 81, 56], label: 'Funcionários' }];

  ngOnInit(): void {}
}
