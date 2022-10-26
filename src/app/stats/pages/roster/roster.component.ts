import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RosterEntity } from '../../models/roster-entity';
import { RosterService } from '../../services/roster.service';


@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  roster: RosterEntity[] = [];

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private rosterService: RosterService) { }

  updateDataEvent: any = () => {
    this.rosterService.GetRoster().subscribe({
      next: (res) => {
        this.roster = res.response;
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
  OpenAddModel():void{

  }
  onOpenDetail(item:RosterEntity):void{

  }
}
