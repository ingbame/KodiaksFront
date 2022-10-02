import { Component, Input, OnInit } from '@angular/core';

import { MemberActionEnum } from 'src/app/shared/enums/member-action-enum';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';

import { NotificationUtility } from 'src/app/shared/utilities/notification';

import { BattingThrowingSidesEntity } from 'src/app/stats/models/batting-throwing-sides-entity';
import { MemberEntity } from '../../models/member';
import { RolesEntity } from '../../models/roles';

import { StatsService } from 'src/app/stats/services/stats.service';
import { MemberService } from '../../services/member.service';
import { RoleService } from '../../services/role.service';

import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {
  MemberActionEnum = MemberActionEnum;
  lstBattingThrowingSides: BattingThrowingSidesEntity[] = [];
  lstRoles: RolesEntity[] = [];

  @Input() saveEvent?: any;
  @Input() actionStr?: MemberActionEnum;
  @Input() idToEdit?: number;
  @Input() MemberModel: MemberEntity = new MemberEntity();

  constructor(
    private memberService: MemberService,
    private statsService: StatsService,
    private notification: NotificationUtility,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.GetRoles();
    this.GetBattingThrowingSides();
  }
  onSubmitMemberModal(): void {
    let model: any = {};
    switch (this.actionStr) {
      case MemberActionEnum.add:
        // myModal?.modal('hide');
        model = this.CreateAddModel();
        if (this.ModelValid(model, true)) {
          this.memberService.AddMember(model).subscribe({
            next: (res) => {
              this.notification.show(NotificationEnum.success, "Acción", "Guardado correctamente.");
              this.MemberModel = new MemberEntity();
            },
            error: (err) => {
              this.notification.show(NotificationEnum.error, "Error", err.error);
            },
            complete: () => {
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
              this.notification.show(NotificationEnum.success, "Acción", "Editado correctamente");
              this.MemberModel = new MemberEntity();
            },
            error: (err) => {
              this.notification.show(NotificationEnum.error, "Error", err.error);
            },
            complete: () => {
              var myModal = document.getElementById('memberModalClose');
              myModal?.click();
              this.saveEvent();
            }
          });
        }
        break;

      default:
        break;
    }
  }
  onDdlRoleChange(event: any) {
    this.MemberModel.roleId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlBtSideChange(event: any) {
    this.MemberModel.btSideId = event.target.selectedOptions[0].dataset.id;
  }
  onMyBirthdayChange(event: any) {
    const [year,month,day] = event.target.value.split('-');
    this.MemberModel.birthday = new Date(+year,+month-1,+day);
  }
  //#region Private Methods
  private GetRoles(): void {
    this.roleService.GetRole().subscribe({
      next: (res) => {
        if (!res.error)
          this.lstRoles = res.model;
      },
      error: (err) => { this.notification.show(NotificationEnum.error, "Error", err); },
      complete: () => { }
    });
  }
  private GetBattingThrowingSides(): void {
    this.statsService.GetBattingThrowingSides().subscribe({
      next: (res) => {
        if (!res.error)
          this.lstBattingThrowingSides = res.model;
      },
      error: (err) => { this.notification.show(NotificationEnum.error, "Error", err); },
      complete: () => { }
    });
  }
  private CreateAddModel(): any {
    let result: any = {};
    if (localStorage.getItem('authUser') && localStorage.getItem('authUser') != '') {
      let authUser = JSON.parse(localStorage.getItem('authUser')!!);
      let decoded: any = jwt_decode(authUser.token);
      const expireDate = (decoded.exp * 1000);
      if (expireDate < Date.now()) {
        localStorage.removeItem('authUser');
        decoded = {};
      }
      else
        decoded.nameidentifier = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      result = {
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
    }
    return result;
  }
  private CreateEditModel(): any {
    let result: any = {};
    if (localStorage.getItem('authUser') && localStorage.getItem('authUser') != '') {
      let authUser = JSON.parse(localStorage.getItem('authUser')!!);
      let decoded: any = jwt_decode(authUser.token);
      const expireDate = (decoded.exp * 1000);
      if (expireDate < Date.now()) {
        localStorage.removeItem('authUser');
        decoded = {};
      }
      else
        decoded.nameidentifier = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      result = {
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
    }
    return result;
  }
  private ModelValid(model: any, isNew: boolean = false): boolean {
    let title: string = "Información incorrecta"
    if (!isNew) {
      if (model.user.roleId == null || Number(model.user.roleId) <= 0) {
        this.notification.show(NotificationEnum.error, title, "No seleccionó rol");
        return false;
      }
    }
    if (model.member.fullName == null || model.member.fullName == "") {
      this.notification.show(NotificationEnum.error, title, "No contiene nombre completo");
      return false;
    }
    if (model.member.nickName == null || model.member.nickName == "") {
      this.notification.show(NotificationEnum.error, title, "No contiene apodo");
      return false;
    }
    if (model.member.shirtNumber == null) {
      this.notification.show(NotificationEnum.error, title, "No contiene numero de playera");
      return false;
    }
    if (model.member.cellPhoneNumber == null || model.member.cellPhoneNumber == "") {
      this.notification.show(NotificationEnum.error, title, "No contiene número de celular");
      return false;
    }
    if (model.member.btsideId == null || Number(model.member.btsideId) <= 0) {
      this.notification.show(NotificationEnum.error, title, "No seleccionó Bateo/Lanzamiento");
      return false;
    }
    return true;
  }
  //#endregion
}
