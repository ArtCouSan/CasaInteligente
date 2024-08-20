import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g12',
  templateUrl: './g12.component.html',
  styleUrl: './g12.component.scss',
})
export class G12Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g12', {
      type: 'radar',
      data: {
        labels: [
          'Comunicação',
          'Trabalho em Equipe',
          'Liderança',
          'Conhecimento Técnico',
          'Gestão de Tempo',
          'Adaptabilidade',
        ],
        datasets: [
          {
            label: 'Time empresarial ',
            data: [6, 6, 5, 9, 6, 8], // Níveis de competência para o colaborador A
            backgroundColor: 'rgba(5, 94, 77, 0.2)',
            borderColor: '#055e4d',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            label: 'Time de agências',
            data: [6, 4, 8, 7, 7, 5], // Níveis de competência para o colaborador B
            backgroundColor: 'rgba(155, 190, 183, 0.2)',
            borderColor: '#9bbeb7',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true, // Exibe as linhas dos ângulos
              color: '#838a83',
            },
            grid: {
              circular: true, // Mantém o círculo das linhas de grade
              color: '#838a83',
            },
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Competências por times',
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
      },
    });
  }
}
