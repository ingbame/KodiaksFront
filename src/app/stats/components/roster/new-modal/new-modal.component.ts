import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MemberEntity } from 'src/app/application/models/member';
import { MemberService } from 'src/app/application/services/member.service';
import { SessionService } from 'src/app/auth/services/session.service';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PositionsEntity } from 'src/app/stats/models/positions-entity';
import { RosterEntity } from 'src/app/stats/models/roster-entity';
import { PositionService } from 'src/app/stats/services/position.service';
import { RosterService } from 'src/app/stats/services/roster.service';

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss']
})
export class NewModalComponent implements OnInit {
  members: MemberEntity[] = [];

  @Input() saveEvent?: any;
  @Input() positions: PositionsEntity[] = [];
  @Input() rosterItem: RosterEntity = new RosterEntity();

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private memberService: MemberService,
    private rosterService: RosterService) { }

  ngOnInit(): void {
    this.getMembers();
  }
  onSubmitRosterModal(): void {
    let model: any = {};
    // myModal?.modal('hide');
    model = this.NewRosterModel();
    if (this.ModelValid(model)) {
      this.spinner.show();
      this.rosterService.Post(model).subscribe({
        next: (res) => {
          this.session.token = res.token;
          this.helper.showMessage(NotificationEnum.success, "Acción", "Guardado correctamente.");
        },
        error: (err) => {
          this.helper.httpCatchError(err);
        },
        complete: () => {
          this.spinner.hide();
          this.rosterItem = new RosterEntity();
          let btnModalClose = document.getElementById("rosterModalClose");
          btnModalClose?.click();
          this.saveEvent();
        }
      });
    }
  }
  onDdlMemberChange(event: any): void {
    this.rosterItem.memberId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlPositionChange(event: any): void {
    this.rosterItem.positionId = event.target.selectedOptions[0].dataset.id;
  }
  private getMembers(): void {
    this.memberService.GetMember().subscribe({
      next: (res) => {
        if (!res.error)
          this.members = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }
    });
  }
  private NewRosterModel(): any {
    let model: any = {
      memberId: this.rosterItem.memberId ?? null,
      positionId: this.rosterItem.positionId ?? null,
      byUser: this.session.nameIdentifier != "" ? this.session.nameIdentifier : null
    }
    return model;
  }
  private ModelValid(model: any): boolean {
    let title: string = "Información incorrecta"
    if (model.memberId == null || Number(model.memberId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó un integrante");
      return false;
    }
    if (model.positionId == null || Number(model.positionId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó la posición");
      return false;
    }
    if (model.byUser == null) {
      this.helper.showMessage(NotificationEnum.error, title, "Front: No se puede guardar, si su sesion no está activa.");
      return false;
    }
    return true;
  }
}
