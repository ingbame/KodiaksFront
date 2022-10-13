import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-in-outs-mov',
  templateUrl: './chart-in-outs-mov.component.html',
  styleUrls: ['./chart-in-outs-mov.component.scss']
})
export class ChartInOutsMovComponent implements OnInit, OnChanges {
  myChart: any;

  public chart: any;
  public ctx: any;

  totalIncome: number = 0.00;
  totalBill: number = 0.00;

  @Input() infoGroup: any = {};

  constructor() { }

  ngOnInit(): void {
    this.refreshChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.myChart) {
      this.myChart.data = this.getChartData(this.infoGroup);
      this.myChart?.update();
    }
  }
  refreshChart(): void {
    this.chart = document.getElementById("myChartMovementsYearMonth");
    this.ctx = this.chart.getContext("2d");
    const configuration = this.getChartConfiguration(this.infoGroup);
    this.myChart = new Chart(this.ctx, configuration);
  }
  getChartConfiguration(infoGroup: any): any {
    const config = {
      type: 'bar',
      data: this.getChartData(infoGroup),
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false
          }
        }
      }
    };
    return config;
  }
  getChartData(infoGroup: any) {
    const data = {
      labels: infoGroup.labels,
      datasets: [
        {
          label: 'Ingresos',
          data: infoGroup.data.income,
          backgroundColor: 'green',
        },
        {
          label: 'Gastos',
          data: infoGroup.data.bill,
          backgroundColor: 'red',
        }
      ]
    };

    this.totalIncome = this.infoGroup.data.income.reduce((accumulator: number, obj: number) => {
      return accumulator + obj;
    }, 0);
    this.totalBill = this.infoGroup.data.bill.reduce((accumulator: number, obj: number) => {
      return accumulator + obj;
    }, 0);
    return data;
  }
}
