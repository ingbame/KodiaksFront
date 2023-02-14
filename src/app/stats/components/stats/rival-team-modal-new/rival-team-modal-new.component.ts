import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/auth/services/session.service';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RivalTeamEntity } from 'src/app/stats/models/rival-team';
import { RivalTeamService } from 'src/app/stats/services/rival-team.service';

@Component({
  selector: 'app-rival-team-modal-new',
  templateUrl: './rival-team-modal-new.component.html',
  styleUrls: ['./rival-team-modal-new.component.scss']
})
export class RivalTeamModalNewComponent implements OnInit {

  @Input() saveEvent?: any;
  @Input() RivalModel: RivalTeamEntity = new RivalTeamEntity();

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private rivalTeamService: RivalTeamService) { }

  ngOnInit(): void {
  }
  onSubmitRivalModal(): void {
    let edit: boolean = (this.RivalModel.rivalTeamId != undefined && this.RivalModel.rivalTeamId > 0);
    if (!edit) {
      if (this.ModelValid(this.RivalModel)) {
        this.spinner.show();
        this.rivalTeamService.Post(this.RivalModel).subscribe({
          next: (res) => {
            this.session.token = res.token;
            //Mostrar desde qui el retorno para que no se consuma otra petición
          },
          error: (err) => {
            this.helper.httpCatchError(err);
          },
          complete: () => {
            this.spinner.hide();
            this.helper.showMessage(NotificationEnum.success, "Acción", "Guardado correctamente.");
            this.RivalModel = new RivalTeamEntity();
            var myModal = document.getElementById('rivalModalClose');
            myModal?.click();
            this.saveEvent();
          }
        });
      }
    } else {
      if (this.ModelValid(this.RivalModel)) {
        this.spinner.show();
        this.rivalTeamService.Put(this.RivalModel.rivalTeamId ?? 0, this.RivalModel).subscribe({
          next: (res) => {
            this.session.token = res.token;
            //Actualizar desde aqui para evitar otra petición
          },
          error: (err) => {
            this.helper.httpCatchError(err);
          },
          complete: () => {
            this.spinner.hide();
            this.helper.showMessage(NotificationEnum.success, "Acción", "Editado correctamente");
            this.RivalModel = new RivalTeamEntity();
            var myModal = document.getElementById('rivalModalClose');
            myModal?.click();
            this.saveEvent();
          }
        });
      }
    }
  }
  ModelValid(model:RivalTeamEntity):boolean{
    let title: string = "Información incorrecta"
    if (model.teamName == null || model.teamName == "") {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene nombre de equipo");
      return false;
    }
    if (model.isActive == undefined || model.isActive == null) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó si es activo o no");
      return false;
    }
    return true;
  }
  onClickCancel(): void {
    var myModal = document.getElementById('rivalModalClose');
    myModal?.click();
  }
}
