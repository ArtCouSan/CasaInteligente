import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g6',
  templateUrl: './g6.component.html',
  styleUrl: './g6.component.scss',
})
export class G6Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g6', {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'], // Anos ou meses
        datasets: [
          {
            label: 'TI',
            data: [5, 10, 8, 15, 2], // Frequência de promoções
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Juridico',
            data: [3, 7, 5, 12, 1],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'RH',
            data: [4, 9, 6, 10, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
          {
            label: 'Atendimento',
            data: [7, 9, 12, 10, 5],
            backgroundColor: 'rgba(255, 19, 64, 0.2)',
            borderColor: 'rgba(255, 19, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Demissões por departamento ao ano',
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
