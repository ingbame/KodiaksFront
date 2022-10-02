import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { MemberActionEnum } from 'src/app/shared/enums/member-action-enum';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { NotificationUtility } from 'src/app/shared/utilities/notification';
import { MemberEntity } from '../../models/member';

import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  actionStr?: MemberActionEnum;
  lstMembers: MemberEntity[] = [];
  idToEdit?: number;
  MemberModel: MemberEntity = new MemberEntity();

  constructor(
    private memberService: MemberService,
    private notification: NotificationUtility) { }

  updateDataEvent: any = () => {
    this.memberService.GetMember().subscribe({
      next: (res) => {
        if (res.length > 0)
          this.lstMembers = res;
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
  OpenAddMemberModel(): void {
    this.actionStr = MemberActionEnum.add;
    this.idToEdit = undefined;
    this.MemberModel = new MemberEntity();
  }
  onEditMember(member: MemberEntity): void {
    this.actionStr = MemberActionEnum.edit;
    this.idToEdit = member.memberId;
    this.MemberModel = JSON.parse(JSON.stringify(member));
  }
}
