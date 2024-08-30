import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g8',
  templateUrl: './g8.component.html',
  styleUrl: './g8.component.scss',
})
export class G8Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('g8', {
      type: 'radar',
      data: {
        labels: [
          'Comunicação',
          'Gestão de Recursos',
          'Carga de Trabalho',
          'Reconhecimento',
          'Ambiente de Trabalho',
        ], // Temas das reclamações
        datasets: [
          {
            label: 'Quantidade de Reclamações',
            data: [8, 5, 7, 6, 12], // Quantidade de reclamações por tema
            backgroundColor: '#055e4d',
            borderColor: '#9bbeb7',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
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
            suggestedMax: 15,
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Reclamações por tema',
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
