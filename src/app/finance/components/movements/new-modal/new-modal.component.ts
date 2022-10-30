import { Component, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MemberEntity } from 'src/app/application/models/member';
import { MemberService } from 'src/app/application/services/member.service';
import { SessionService } from 'src/app/auth/services/session.service';
import { ConceptEntity } from 'src/app/finance/models/concept';
import { MethodEntity } from 'src/app/finance/models/method';
import { MovementEntity } from 'src/app/finance/models/movement';
import { MovementTypeEntity } from 'src/app/finance/models/movement-type';
import { ConceptService } from 'src/app/finance/services/concept.service';
import { MethodService } from 'src/app/finance/services/method.service';
import { MovementService } from 'src/app/finance/services/movement.service';
import { MovementsTypeService } from 'src/app/finance/services/movements-type.service';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss']
})
export class NewModalComponent implements OnInit {
  movementTypes: MovementTypeEntity[] = [];
  concepts: ConceptEntity[] = [];
  methods: MethodEntity[] = [];
  members: MemberEntity[] = [];

  @Input() saveEvent?: any;
  @Input() movement: MovementEntity = new MovementEntity();

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private movementsTypeService: MovementsTypeService,
    private conceptService: ConceptService,
    private methodService: MethodService,
    private memberService: MemberService,
    private movementService: MovementService) { }

  ngOnInit(): void {
    this.getMovementTypes();
    this.getConcepts();
    this.getMethods();
    this.getMembers();
  }
  onSubmitMovementModal(): void {
    let model: any = {};
    // myModal?.modal('hide');
    model = this.NewMovementModel();
    if (this.ModelValid(model)) {
      this.spinner.show();
      this.movementService.post(model).subscribe({
        next: (res) => {
          this.session.token = res.token;
          this.helper.showMessage(NotificationEnum.success, "Acción", "Guardado correctamente.");
        },
        error: (err) => {
          this.helper.httpCatchError(err);
        },
        complete: () => {
          this.spinner.hide();
          this.movement = new MovementEntity();
          let btnModalClose = document.getElementById("movementModalClose");
          btnModalClose?.click();
          this.saveEvent();
        }
      });
    }


  }
  onDdlMemberChange(event: any): void {
    this.movement.memberId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlMovementTypeChange(event: any): void {
    this.movement.movementTypeId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlConceptChange(event: any): void {
    this.movement.conceptId = event.target.selectedOptions[0].dataset.id;
  }
  onDdlMethodChange(event: any): void {
    this.movement.methodId = event.target.selectedOptions[0].dataset.id;
  }
  onMovementDateChange(event: any): void {
    const [year, month, day] = event.target.value.split('-');
    this.movement.movementDate = new Date(+year, +month - 1, +day);
  }
  private getMovementTypes(): void {
    this.spinner.show();
    this.movementsTypeService.Get().subscribe({
      next: (res) => {
        this.movementTypes = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });

  }
  private getConcepts(): void {
    this.spinner.show();
    this.conceptService.Get().subscribe({
      next: (res) => {
        this.concepts = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
  private getMethods(): void {
    this.spinner.show();
    this.methodService.Get().subscribe({
      next: (res) => {
        this.methods = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
  private getMembers(): void {
    this.spinner.show();
    this.memberService.GetMember().subscribe({
      next: (res) => {
        if (!res.error)
          this.members = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }
  private NewMovementModel(): any {
    let model: any = {
      movementId: this.movement.movementId ?? null,
      memberId: this.movement.memberId ?? null,
      movementTypeId: this.movement.movementTypeId ?? null,
      conceptId: this.movement.conceptId ?? null,
      methodId: this.movement.methodId ?? null,
      movementDate: this.movement.movementDate ?? null,
      amount: this.movement.amount ?? null,
      additionalComment: this.movement.additionalComment?.trim() ?? null,
      evidenceUrl: this.movement.evidenceUrl?.trim() ?? null,
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
    if (model.movementTypeId == null || Number(model.movementTypeId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó tipo de movimiento");
      return false;
    }
    if (model.conceptId == null || Number(model.conceptId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó concepto");
      return false;
    }
    if (model.methodId == null || Number(model.methodId) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No seleccionó método de pago");
      return false;
    }
    if (model.movementDate == null) {
      this.helper.showMessage(NotificationEnum.error, title, "La fecha está vacía");
      return false;
    }

    if (model.movementDate > Date.now()) {
      this.helper.showMessage(NotificationEnum.error, title, "La fecha es mayor a la actual.");
      return false;
    }
    if (model.amount == null || Number(model.amount) <= 0) {
      this.helper.showMessage(NotificationEnum.error, title, "No contiene monto a guardar");
      return false;
    }
    if (model.byUser == null) {
      this.helper.showMessage(NotificationEnum.error, title, "Front: No se puede guardar, si su sesion no está activa.");
      return false;
    }
    return true;
  }
}
