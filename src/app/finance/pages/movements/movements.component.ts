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
  total: number = 0.00;
  movement: MovementEntity = new MovementEntity();
  movementEdit: MovementEntity = new MovementEntity();
  movements: MovementEntity[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private movementServices: MovementService) { }

  updateDataEvent: any = () =>{
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
        this.session.token = res.token;
        if (res.response.length > 0)
          this.movements = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }
    });
  };
  ngOnInit(): void {
    this.updateDataEvent();
  }
  OpenAddMovementModel(): void {
    this.movement = new MovementEntity();
  }
  onOpenDetailMovement(movement: any): void {
    this.movementEdit = JSON.parse(JSON.stringify(movement));
  }
}
