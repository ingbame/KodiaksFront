import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { PositionsEntity } from '../../models/positions-entity';
import { RosterEntity } from '../../models/roster-entity';
import { PositionService } from '../../services/position.service';
import { RosterService } from '../../services/roster.service';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  rosterItem: RosterEntity = new RosterEntity();
  positions: PositionsEntity[] = [];
  roster: RosterEntity[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService,
    private rosterService: RosterService,
    private positionService: PositionService) { }

  updateDataEvent: any = () => {
    this.spinner.show();
    this.rosterService.Get().subscribe({
      next: (res) => {
        this.session.token = res.token;
        this.roster = res.response;
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
    this.getPositionService();
    this.updateDataEvent();
  }

  getPositionService(): void {
    this.spinner.show();
    this.positionService.Get().subscribe({
      next: (res) => {
        this.positions = res.response;
      },
      error: (err) => {
        this.helper.httpCatchError(err);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  OpenAddModel(): void {
    this.rosterItem = new RosterEntity();
  }
  onOpenDetail(item: RosterEntity): void {
    this.rosterItem = JSON.parse(JSON.stringify(item));
  }
  onDelete(item: RosterEntity): void {
    this.rosterItem = JSON.parse(JSON.stringify(item));
  }
}
