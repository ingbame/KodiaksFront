import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RivalTeamEntity } from 'src/app/stats/models/rival-team';
import { RivalTeamService } from 'src/app/stats/services/rival-team.service';

@Component({
  selector: 'app-rival-team-page',
  templateUrl: './rival-team-page.component.html',
  styleUrls: ['./rival-team-page.component.scss']
})
export class RivalTeamPageComponent implements OnInit {
  RivalModel: RivalTeamEntity = new RivalTeamEntity();
  lstRivals: RivalTeamEntity[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private rivalTeamService: RivalTeamService) { }

  updateDataEvent: any = () => {
    this.spinner.show();
    this.rivalTeamService.Get().subscribe({
      next: (res) => {
        this.session.token = res.token;
        if (res.response.length > 0)
          this.lstRivals = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }

    });
  };

  ngOnInit(): void {
    this.updateDataEvent();
  }

  OpenAddRivalModel(): void {
    this.RivalModel = new RivalTeamEntity();
  }
  onEditRival(member: RivalTeamEntity): void {
    this.RivalModel = JSON.parse(JSON.stringify(member));
  }
}
