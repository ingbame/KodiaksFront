import { Component, Input, OnInit } from '@angular/core';

import { MemberActionEnum } from 'src/app/shared/enums/member-action-enum';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';

import { BattingThrowingSidesEntity } from 'src/app/stats/models/batting-throwing-sides-entity';
import { MemberEntity } from '../../models/member';
import { RolesEntity } from '../../models/roles';

import { StatsService } from 'src/app/stats/services/stats.service';
import { MemberService } from '../../services/member.service';
import { RoleService } from '../../services/role.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SessionService } from 'src/app/auth/services/session.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {
  MemberActionEnum = MemberActionEnum;
  lstBattingThrowingSides: BattingThrowingSidesEntity[] = [];
  lstRoles: RolesEntity[] = [];

  @Input() usrRol?: any;
  @Input() saveEvent?: any;
  @Input() actionStr?: MemberActionEnum;
  @Input() idToEdit?: number;
  @Input() MemberModel: MemberEntity = new MemberEntity();

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private memberService: MemberService,
    private statsService: StatsService,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.GetRoles();
    this.GetBattingThrowingSides();
  }
  onSubmitMemberModal(): void {
    if (this.actionStr === MemberActionEnum.detail) {
      this.actionStr = MemberActionEnum.edit;
      return;
    }

    let model: any = {};
    switch (this.actionStr) {
      case MemberActionEnum.add:
        // myModal?.modal('hide');
        model = this.CreateAddModel();
        if (this.ModelValid(model, true)) {
          this.memberService.AddMember(model).subscribe({
            next: (res) => {
              this.session.token = res.token;
              //Mostrar desde qui el retorno para que no se consuma otra petición
            },
            error: (err) => {
              this.helper.httpCatchError(err);
            },
            complete: () => {
              this.helper.showMessage(NotificationEnum.success, "Acción", "Guardado correctamente.");
              this.MemberModel = new MemberEntity();
              this.actionStr = undefined;
              var myModal = document.getElementById('memberModalClose');
              myModal?.click();
              this.saveEvent();
            }
          });
        }
        break;
      case MemberActionEnum.edit:
        model = this.CreateEditModel();
        if (this.ModelValid(model)) {
          this.memberService.UpdateMember(this.idToEdit, model).subscribe({
            next: (res) => {
              this.session.token = res.token;
              //Actualizar desde aqui para evitar otra petición
            },
            error: (err) => {
              this.helper.httpCatchError(err);
            },
            complete: () => {
              this.helper.showMessage(NotificationEnum.success, "Acción", "Editado correctamente");
              this.MemberModel = new MemberEntity();
              this.actionStr = undefined;
              var myModal = document.getElementById('memberModalClose');
              myModal?.click();
              this.saveEvent();
            }
          });
        }
        break;
    }
  }
  onClickCancel(): void {
    this.actionStr = undefined;
    var myModal = document.getElementById('memberModalClose');
    myModal?.click();
  }
  onDdlRoleChange(event: any) {
    this.MemberModel.roleId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlBtSideChange(event: any) {
    this.MemberModel.btSideId = event.target.selectedOptions[0].dataset.id;
  }
  onMyBirthdayChange(event: any) {
    const [year, month, day] = event.target.value.split('-');
    this.MemberModel.birthday = new Date(+year, +month - 1, +day);
  }
  //#region Private Methods
  private GetRoles(): void {
    this.roleService.GetRole().subscribe({
      next: (res) => {
        if (!res.response.error)
          this.lstRoles = res.response.model;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }
    });
  }
  private GetBattingThrowingSides(): void {
    this.statsService.GetBattingThrowingSides().subscribe({
      next: (res) => {
        if (!res.response.error)
          this.lstBattingThrowingSides = res.response.model;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => { }
    });
  }
  private CreateAddModel(): any {
    let result: any = {
      member: {
        fullName: this.MemberModel.fullName?.trim() ?? null,
        nickName: this.MemberModel.nickName?.trim() ?? null,
        shirtNumber: this.MemberModel.shirtNumber ?? null,
        btsideId: this.MemberModel.btSideId ?? null,
        photoUrl: this.MemberModel.photoUrl?.trim() ?? null,
        birthday: this.MemberModel.birthday ?? null,
        email: this.MemberModel.email?.trim() ?? null,
        cellPhoneNumber: this.MemberModel.cellPhoneNumber?.trim() ?? null
      },
      user: {
        userName: this.MemberModel.cellPhoneNumber?.trim() ?? null,
        password: "Kodiaks" + this.MemberModel.cellPhoneNumber?.trim()?.substring(this.MemberModel.cellPhoneNumber.length - 4) ?? null
      }
    };
    return result;
  }
  private CreateEditModel(): any {
    let result: any = {
      member: {
        memberId: this.MemberModel.memberId ?? null,
        fullName: this.MemberModel.fullName?.trim() ?? null,
        nickName: this.MemberModel.nickName?.trim() ?? null,
        shirtNumber: this.MemberModel.shirtNumber ?? null,
        btsideId: this.MemberModel.btSideId ?? null,
        photoUrl: this.MemberModel.photoUrl?.trim() ?? null,
        birthday: this.MemberModel.birthday ?? null,
        email: this.MemberModel.email?.trim() ?? null,
        cellPhoneNumber: this.MemberModel.cellPhoneNumber?.trim() ?? null
      },
      user: {
        userId: this.MemberModel.userId ?? null,
        userName: this.MemberModel.cellPhoneNumber?.trim() ?? null,
        roleId: this.MemberModel.roleId ?? null,
        canEdit: this.MemberModel.canEdit ?? null,
        isVerified: this.MemberModel.isVerified ?? null,
        isActive: this.MemberModel.isActive ?? null,
      }
    };
    return result;
  }
  private ModelValid(model: any, isNew: boolean = false): boolean {
    let title: string = "Información incorrecta"
    if (!isNew) {
      if (model.user.roleId == null || Number(model.user.roleId) <= 0) {
        this.helper.showMessage(NotificationEnum.error, title, "No seleccionó rol");
        return false;
      }
    }
    if (model.member.fullName == null || model.member.fullName == "") {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene nombre completo");
      return false;
    }
    if (model.member.nickName == null || model.member.nickName == "") {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene apodo");
      return false;
    }
    if (model.member.shirtNumber == null) {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene numero de playera");
      return false;
    }
    if (model.member.cellPhoneNumber == null || model.member.cellPhoneNumber == "") {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene número de celular");
      return false;
    }
    if (model.member.btsideId == null || Number(model.member.btsideId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó Bateo/Lanzamiento");
      return false;
    }
    return true;
  }
  //#endregion
}
