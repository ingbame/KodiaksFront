export class MovementEntity {
  movementId?: number;
  memberId?: number;
  fullName?: string;
  conceptId?: number;
  conceptKey?: string;
  conceptDesc?: string;
  movementTypeId?: number;
  movementTypeKey?: string;
  movementTypeDesc?: string;
  methodId?: number;
  methodDesc?: string;
  movementDate?: Date;
  amount?: number;
  additionalComment?: string;
  evidenceUrl?: string;
  createdDate?: Date;
  createdById?: number;
  createdBy?: string;
}
