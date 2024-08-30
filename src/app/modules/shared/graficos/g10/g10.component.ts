import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g10',
  templateUrl: './g10.component.html',
  styleUrl: './g10.component.scss',
})
export class G10Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('g10', {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            data: [83, 75, 45, 50, 38],
            backgroundColor: '#055e4d',
            borderColor: '#155e4d',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Reclamações ao longos do anos',
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
        },
      },
    });
  }
}
