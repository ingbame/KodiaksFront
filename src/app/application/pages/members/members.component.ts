import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { SessionService } from 'src/app/auth/services/session.service';
import { MemberActionEnum } from 'src/app/shared/enums/member-action-enum';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MemberEntity } from '../../models/member';

import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  usrRol?: any;
  actionStr?: MemberActionEnum;
  lstMembers: MemberEntity[] = [];
  idToEdit?: number;
  MemberModel: MemberEntity = new MemberEntity();

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private memberService: MemberService) { }

  updateDataEvent: any = () => {
    this.memberService.GetMember().subscribe({
      next: (res) => {
        this.session.token = res.token;
        if (res.response.length > 0)
          this.lstMembers = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
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
