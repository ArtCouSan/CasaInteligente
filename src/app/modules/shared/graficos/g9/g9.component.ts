import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-g9',
  templateUrl: './g9.component.html',
  styleUrl: './g9.component.scss',
})
export class G9Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g9', {
      type: 'pie',
      data: {
        labels: [
          'Salário',
          'Ambiente de Trabalho',
          'Falta de Crescimento',
          'Gestão',
          'Benefícios',
        ], // Razões de saída
        datasets: [
          {
            label: 'Número de Colaboradores',
            data: [40, 23, 7, 7, 23], // Número de colaboradores que saíram por cada razão
            backgroundColor: [
              '#055e4d',
              '#377e70',
              '#699e94',
              '#9bbeb7',
              '#115245',
            ],
            borderColor: [
              '#055e4d',
              '#377e70',
              '#699e94',
              '#9bbeb7',
              '#115245',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Principais razões de saída dos colaboradores',
            font: {
              size: 20,
            },
            color: 'white',
            padding: {
              bottom: 20,
            },
          },
          legend: {
            display: true,
          },
          datalabels: {
            display: true,
            color: 'white', // Cor dos números
            font: {
              weight: 'bold',
              size: 10,
            },
            formatter: (value: any) => {
              return `${value}%`; // Exibe os valores com porcentagem
            },
          },
        },
        responsive: false,
      },
      plugins: [ChartDataLabels], // Adiciona o plugin de Data Labels
    });
  }
}
