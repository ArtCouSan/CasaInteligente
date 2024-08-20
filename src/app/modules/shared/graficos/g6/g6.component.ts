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
            data: [5, 10, 8, 15, 3], // Frequência de promoções
            backgroundColor: '#055e4d',
            borderColor: '#055e4d',
            borderWidth: 1,
          },
          {
            label: 'Juridico',
            data: [3, 7, 5, 12, 4],
            backgroundColor: '#377e70',
            borderColor: '#377e70',
            borderWidth: 1,
          },
          {
            label: 'Atendimento',
            data: [21, 11, 9, 10, 9],
            backgroundColor: '#699e94',
            borderColor: '#699e94',
            borderWidth: 1,
          },
          {
            label: 'RH',
            data: [2, 3, 1, 4, 7],
            backgroundColor: '#9bbeb7',
            borderColor: '#9bbeb7',
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
