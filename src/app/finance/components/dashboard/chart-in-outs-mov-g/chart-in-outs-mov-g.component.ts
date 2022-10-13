import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-in-outs-mov-g',
  templateUrl: './chart-in-outs-mov-g.component.html',
  styleUrls: ['./chart-in-outs-mov-g.component.scss']
})
export class ChartInOutsMovGComponent implements OnInit, OnChanges {
  myChartPie: any;

  public chart: any;
  public ctx: any;

  @Input() infoGroup: any = {};

  constructor() { }

  ngOnInit(): void {
    this.refreshChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.myChartPie) {
      this.myChartPie.data = this.getChartData(this.infoGroup);
      this.myChartPie?.update();
    }
  }
  refreshChart(): void {
    this.chart = document.getElementById("myPieChartMovementsYearMonth");
    this.ctx = this.chart.getContext("2d");
    const configuration = this.getChartConfiguration(this.infoGroup);
    this.myChartPie = new Chart(this.ctx, configuration);
  }
  getChartConfiguration(infoGroup: any): any {
    const config = {
      type: 'doughnut',
      data: this.getChartData(infoGroup),
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      },
    };
    return config;
  }
  getChartData(infoGroup: any) {
    let income = 0.00;
    let bill = 0.00;
    infoGroup.data?.income?.forEach((item: any) => {
      income = income + item;
    });
    infoGroup.data?.bill?.forEach((item: any) => {
      bill = bill + item;
    });
    const data = {
      labels: ['Ingresos', 'Egresos'],
      datasets: [
        {
          label: 'Ingresos y Egresos',
          data: [income,bill],
          backgroundColor: ['green', 'red'],
        }
      ]
    };
    return data;
  }
}
