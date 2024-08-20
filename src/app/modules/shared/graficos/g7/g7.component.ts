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
            label: 'Setor A',
            data: [10], // Número total de reclamações do Setor A
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setor B',
            data: [15], // Número total de reclamações do Setor B
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setor C',
            data: [8], // Número total de reclamações do Setor C
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
          {
            label: 'Setor D',
            data: [5], // Número total de reclamações do Setor D
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
            text: 'Dimissões por departamento ao ano',
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
            title: {
              display: true,
              text: 'Categorias de Reclamações',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
