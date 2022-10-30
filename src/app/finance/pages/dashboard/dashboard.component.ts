import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  total: number = 0.00;

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;

  yearSelect: any[] = [];

  movements: MovementEntity[] = [];

  infoGroup: any = {
    labels: [],
    data: {
      income: [],
      bill: []
    }
  };

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private movementServices: MovementService
  ) { }

  ngOnInit(): void {
    for (let index = 2022; index <= (2022 + 10); index++) {
      this.yearSelect.push(index);
    }

    this.spinner.show();
    this.movementServices.GetTotal().subscribe({
      next: (res) => {
        this.total = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });

    this.refreshModel();
  }
  refreshModel(): void {
    let preInfoGroup: any = {
      labels: [],
      data: {
        income: [],
        bill: []
      }
    };

    this.spinner.show();
    this.movementServices.GetYearMonth(this.year, this.month).subscribe({
      next: (res) => {
        this.session.token = res.token;
        if (res.response.length > 0) {
          let model = res.response;

          let paymentDates: any[] = model.map((mp: any) => mp.movementDate);
          paymentDates.forEach((item: any) => {
            let search = preInfoGroup.labels?.filter((f: any) => f == item) ?? [];
            if (search.length <= 0)
              preInfoGroup.labels.push(item);
          });

          preInfoGroup.labels.forEach((item: any) => {
            let filterPayments = model.filter((f: any) => f.movementDate == item);
            if (filterPayments.length > 0) {
              preInfoGroup.data.income.push(filterPayments.find((f: any) => f.movementTypeId === 1)?.amount ?? 0.00);
              preInfoGroup.data.bill.push(filterPayments.find((f: any) => f.movementTypeId === 2)?.amount ?? 0.00);
            } else {
              preInfoGroup.data.income.push(0.00);
              preInfoGroup.data.bill.push(0.00);
            }
          });
        }
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.infoGroup = preInfoGroup;
        this.spinner.hide();
      }
    });

    this.getMovements();
  }
  getMovements(): void {
    this.spinner.show();
    this.movementServices.Get(undefined, this.year, this.month).subscribe({
      next: (res) => {
        this.session.token = res.token;
        this.movements = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
  onDdlYearChange(e: any): void {
    this.year = e.target.value !== "undefined" ? e.target.value : undefined;
  }
  onDdlMonthChange(e: any): void {
    this.month = e.target.value !== "undefined" ? e.target.value : undefined;
  }
}
