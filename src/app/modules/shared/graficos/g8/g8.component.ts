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

  constructor() {}

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
        ],
        datasets: [
          {
            label: 'Reclamações',
            data: [5, 10, 8, 15, 2], // Frequência de promoções
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
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
