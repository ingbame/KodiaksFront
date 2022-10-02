export class MemberEntity {
  memberId?: number;
  userId?: number;
  roleId?: number;
  roleDesc?: string;
  fullName?: string;
  nickName?: string;
  shirtNumber?: number;
  btSideId?: number;
  btSideDesc?: string;
  photoUrl?: string;
  birthday?: Date;
  email?: string;
  cellPhoneNumber?: string;
  canEdit?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  createdDate?: Date;
}
