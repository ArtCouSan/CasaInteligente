import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-g4',
  templateUrl: './g4.component.html',
  styleUrl: './g4.component.scss'
})
export class G4Component {
  title = 'ng-chart';
  g4: any = [];

  constructor() { }

  ngOnInit() {
    this.g4 = new Chart('g4', {
      type: 'pie',
      data: {
        labels: ['Renato Souza (TI)', 'Maria Vitoria (Júridico)', 'Paulo Lima (Atendimento)', 'Luiza Gritto (RH)'],
        datasets: [
          {
            data: [40, 35, 15, 10],
            backgroundColor: ['#055e4d', '#377e70', '#699e94', '#9bbeb7'], // Aplicando as cores
            borderWidth: 0 // Removendo as bordas das fatias
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chance de evasão por gestor',
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
