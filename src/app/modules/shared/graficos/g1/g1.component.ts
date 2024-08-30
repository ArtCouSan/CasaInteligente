import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-g1',
  templateUrl: './g1.component.html',
  styleUrl: './g1.component.scss'
})
export class G1Component implements OnInit {

  title = 'ng-chart';
  chart: any = [];

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('g1', {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            data: [683, 722, 856, 906, 1000],
            backgroundColor: '#055e4d',
            borderColor: '#155e4d'
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Colaboradores por ano',
            font: {
              size: 20
            },
            color: 'white',
            padding: {
              bottom: 20
            }
          },
          legend: {
            display: false
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
