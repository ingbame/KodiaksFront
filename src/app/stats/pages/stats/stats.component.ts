import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { GamePlayedStatsEntity } from '../../models/game-played-stats-entity';
import { GamePlayedEntity } from '../../models/game-played-entity';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

}
