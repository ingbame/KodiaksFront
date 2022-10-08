import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MovementEntity } from '../../models/movement';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: any;

  total: number = 0.00;
  movements: MovementEntity[] = [];
  paymentDates: any[] = [];
  amountsNeg: any[] = [];
  amounts: any[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private movementServices: MovementService
  ) { }

  ngOnInit(): void {
    this.getMovements();
  }
  getMovements(): void {
    this.movementServices.GetTotal().subscribe({
      next: (res) => {
        this.total = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }

    });
    this.movementServices.Get().subscribe({
      next: (res) => {
        console.log('res', res);
        this.session.token = res.token;
        if (res.response.length > 0) {
          this.movements = res.response;


          this.paymentDates = this.movements.map(m => m.movementDate);
          let dataGroup: any[] = [];
          this.paymentDates.forEach((item: any) => {
            let search = dataGroup.filter(f => f == item);
            if (search.length <= 0)
              dataGroup.push(item);
          });

          console.log('movements', this.movements);
          console.log('paymentDates', this.paymentDates);
          dataGroup.forEach((item: any) => {
            let filterPayments = this.movements.filter(f => f.movementDate == item);
            if (filterPayments.length > 0) {
              let sum = 0.00;
              let sumNeg = 0.00;
              filterPayments.forEach((item: any) => {
                if (item.movementTypeId == 2) {
                  sumNeg = sumNeg + item.amount;
                } else {
                  sum = sum + item.amount;
                }
              });
              this.amounts.push(sum);
              this.amountsNeg.push(sumNeg);
            } else {
              this.amounts.push(0.00);
            }
          });
          console.log('dataGroup', dataGroup);
          console.log('amounts', this.amounts);
          console.log('amountsNeg', this.amountsNeg);

          this.canvas = document.getElementById("myChart");
          this.ctx = this.canvas.getContext("2d");

          const myChart = new Chart(this.ctx, {
            data: {
              labels: dataGroup,
              datasets: [
                {
                  type: 'bar',
                  label: 'Ingresos',
                  data: this.amounts,
                  backgroundColor: 'transparent',
                  borderColor: 'green',
                  borderWidth: 1
                },
                {
                  type: 'line',
                  label: 'Gastos',
                  data: this.amountsNeg,
                  backgroundColor: 'red'
                }
              ]
            },
            options: {
              scales: {
                y: {
                  stacked: true
                }
              }
            }
          });

        }
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }

    });
  }
}
