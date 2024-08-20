import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g2',
  templateUrl: './g2.component.html',
  styleUrl: './g2.component.scss',
})
export class G2Component {
  title = 'ng-chart';
  g2: any = [];

  constructor() {}

  ngOnInit() {
    this.g2 = new Chart('g2', {
      type: 'bar',
      data: {
        labels: ['Homens', 'Mulheres'],
        datasets: [
          {
            data: [35, 65],
            backgroundColor: '#055e4d',
          },
        ],
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: 'Colaboradores com chance de evasão',
            font: {
              size: 20,
            },
            color: 'white',
            padding: {
              bottom: 20,
            },
          },
          legend: {
            display: false,
          },
        },
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value}`,
            },
          },
        },
      },
    });
  }
}
