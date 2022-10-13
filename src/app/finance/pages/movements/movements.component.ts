import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MovementEntity } from '../../models/movement';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  declare bootstrap?: any;

  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;

  yearSelect: any[] = [];

  total: number = 0.00;
  movement: MovementEntity = new MovementEntity();
  movementEdit: MovementEntity = new MovementEntity();
  movements: MovementEntity[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private movementServices: MovementService) { }

  updateDataEvent: any = () => {
    this.movementServices.GetTotal().subscribe({
      next: (res) => {
        this.total = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }

    });
    this.getMovements();
  };
  ngOnInit(): void {
    for (let index = 2022; index <= (2022 + 10); index++) {
      this.yearSelect.push(index);
    }
    this.updateDataEvent(this.year, this.month);
  }
  getMovements(): void {
    this.movementServices.Get(undefined, this.year, this.month).subscribe({
      next: (res) => {
        this.session.token = res.token;
        this.movements = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }
    });
  }
  onDdlYearChange(e: any): void {
    this.year = e.target.value !== "undefined" ? e.target.value : undefined;
  }
  onDdlMonthChange(e: any): void {
    this.month = e.target.value !== "undefined" ? e.target.value : undefined;
  }
  OpenAddMovementModel(): void {
    this.movement = new MovementEntity();
  }
  onOpenDetailMovement(movement: any): void {
    this.movementEdit = JSON.parse(JSON.stringify(movement));
  }
}
