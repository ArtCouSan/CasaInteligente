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
            data: [10, 15, 8, 12, 20], // Quantidade de demissões por ano
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.1,
          },
          {
            label: 'Promoções',
            data: [5, 10, 12, 15, 18], // Quantidade de promoções por ano
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Demissões x Promossões anuais',
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
