import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g5',
  templateUrl: './g5.component.html',
  styleUrl: './g5.component.scss',
})
export class G5Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g5', {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'], // Anos
        datasets: [
          {
            label: 'Demissões',
            data: [51, 41, 33, 37, 23], // Quantidade de demissões por ano
            borderColor: '#055e4d',
            backgroundColor: '#055e4d',
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Promoções',
            data: [5, 10, 12, 15, 18], // Quantidade de promoções por ano
            borderColor: '#9bbeb7',
            backgroundColor: '#9bbeb7',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Demissões vs Promoções anuais',
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
