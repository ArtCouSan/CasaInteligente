// gender-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-gender-bar',
  template: `
    <div class="chart-container">
      <h3>Funcionários por Gênero</h3>
      <canvas
        baseChart
        [data]="barChartData"
        [labels]="barChartLabels"
        [options]="barChartOptions"
        [chartType]="barChartType"
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
export class GenderBarComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Homens', 'Mulheres'];
  barChartType: ChartType = 'bar';
  barChartData = [{ data: [600, 400], label: 'Gênero' }];

  ngOnInit(): void {}
}
