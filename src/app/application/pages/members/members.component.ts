import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { MemberActionEnum } from 'src/app/shared/enums/member-action-enum';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { Extentions } from 'src/app/shared/utilities/extentions';
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
    private ext: Extentions,
    private memberService: MemberService,
    private notification: NotificationUtility) { }

  updateDataEvent: any = () => {
    this.memberService.GetMember().subscribe({
      next: (res) => {
        this.ext.refreshToken(res.token);
        if (res.response.length > 0)
          this.lstMembers = res.response;
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
    this.idToEdit = member.memberId;
    this.MemberModel = JSON.parse(JSON.stringify(member));
  }
}
