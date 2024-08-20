import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g7',
  templateUrl: './g7.component.html',
  styleUrl: './g7.component.scss',
})
export class G7Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g7', {
      type: 'bar',
      data: {
        labels: ['Reclamações'], // Apenas uma categoria
        datasets: [
          {
            label: 'TI',
            data: [10], // Número total de reclamações do Setor A
            backgroundColor: '#055e4d',
          },
          {
            label: 'Júridico',
            data: [15], // Número total de reclamações do Setor B
            backgroundColor: '#377e70',
          },
          {
            label: 'Atendimento',
            data: [8], // Número total de reclamações do Setor C
            backgroundColor: '#699e94',
          },
          {
            label: 'RH',
            data: [5], // Número total de reclamações do Setor D
            backgroundColor: '#9bbeb7',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Reclamações por Departamento',
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
          x: {
            stacked: true, // Habilita barras empilhadas no eixo X
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });
  }
}
