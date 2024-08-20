import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-g11',
  templateUrl: './g11.component.html',
  styleUrl: './g11.component.scss',
})
export class G11Component {
  title = 'ng-chart';
  chart: any = [];

  constructor() {}

  ngOnInit() {
    this.chart = new Chart('g11', {
      type: 'bar',
      data: {
        labels: ['TI', 'Júridico', 'Atendimento', 'RH'],
        datasets: [
          {
            label: 'Salário',
            data: [2, 2, 3, 3], // Valores para 'Salário'
            backgroundColor: '#055e4d',
            stack: 'stack1',
          },
          {
            label: 'Ambiente de Trabalho',
            data: [0, 2, 3, 0], // Valores para 'Ambiente de Trabalho'
            backgroundColor: '#377e70',
            stack: 'stack1',
          },
          {
            label: 'Falta de Crescimento',
            data: [0, 0, 1, 0], // Valores para 'Falta de Crescimento'
            backgroundColor: '#699e94',
            stack: 'stack1',
          },
          {
            label: 'Gestão',
            data: [1, 0, 0, 0], // Valores para 'Outros'
            backgroundColor: '#9bbeb7',
            stack: 'stack1',
          },
          {
            label: 'Benefícios',
            data: [0, 0, 2, 4], // Valores para 'Outros'
            backgroundColor: '#115245',
            stack: 'stack1',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Razão da Demissão por Departamento',
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
