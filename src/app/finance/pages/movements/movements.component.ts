import { Component, OnInit } from '@angular/core';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { Extentions } from 'src/app/shared/utilities/extentions';
import { NotificationUtility } from 'src/app/shared/utilities/notification';
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
    private ext: Extentions,
    private movementServices: MovementService,
    private notification: NotificationUtility) { }

  updateDataEvent: any = () =>{
    this.movementServices.GetTotal().subscribe({
      next: (res) => {
        this.total = res.response;
      },
      error: (err) => {
        this.notification.show(NotificationEnum.error, "Error", err.error);
      },
      complete: () => { }

    });
    this.movementServices.Get().subscribe({
      next: (res) => {
        this.ext.refreshToken(res.token);
        if (res.response.length > 0)
          this.movements = res.response;
      },
      error: (err) => {
        this.notification.show(NotificationEnum.error, "Error", err.error);
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
