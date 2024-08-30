import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-g3',
  templateUrl: './g3.component.html',
  styleUrl: './g3.component.scss'
})
export class G3Component {
  title = 'ng-chart';
  g3: any = [];

  constructor() { }

  ngOnInit() {
    this.g3 = new Chart('g3', {
      type: 'pie',
      data: {
        labels: ['TI', 'Júridico', 'Atendimento', 'RH'],
        datasets: [
          {
            data: [15, 35, 40, 10],
            backgroundColor: ['#055e4d', '#377e70', '#699e94', '#9bbeb7'], // Aplicando as cores
            borderWidth: 0 // Removendo as bordas das fatias
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chance de evasão por departamento',
            font: {
              size: 20
            },
            color: 'white',
            padding: {
              bottom: 20
            }
          },
          legend: {
            display: true
          },
          datalabels: {
            display: true,
            color: 'white', // Cor dos números
            font: {
              weight: 'bold',
              size: 10
            },
            formatter: (value: any) => {
              return `${value}%`; // Exibe os valores com porcentagem
            },
          },
        },
        responsive: false
      },
      plugins: [ChartDataLabels] // Adiciona o plugin de Data Labels
    });
  }
}
