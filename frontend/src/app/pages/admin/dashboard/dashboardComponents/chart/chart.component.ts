import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { registerables, Chart } from 'chart.js';
import { ProcedureApi } from 'src/app/API/procedure.api';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  stats: any;
  rapportCount: Number = 0;
  succProc: Number = 0;
  failProc: Number = 0;
  

  constructor(private procedueApi : ProcedureApi) {}
  // Récuperer les statistique lors de chargement de la page
  ngOnInit(): void {
    this.procedueApi.getStats().subscribe((data: any) => {
    this.stats = data;
    this.rapportCount = data.total;
    this.succProc = data.success;
    this.failProc = data.failure;
    this.RenderChart();
  });
}

  RenderChart() {
    const myChart = new Chart("piechart", {
      type: 'pie',
      data: {
        labels: ['Succés', 'Echec'],
        datasets: [{
          data: [this.stats.success, this.stats.failure],
          backgroundColor: [
            '#2ecc71',
            '#e74c3c'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }
}