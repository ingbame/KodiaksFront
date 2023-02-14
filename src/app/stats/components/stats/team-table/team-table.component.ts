import { Component, Input, OnInit } from '@angular/core';
import { GamePlayedDetailEntity } from 'src/app/stats/models/game-played-detail';
import { GamePlayedOurDetailEntity } from 'src/app/stats/models/game-played-our-detail';
import { GamePlayedStatsEntity } from 'src/app/stats/models/game-played-stats-entity';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  players: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  innings: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  @Input() detailOfOurGame: GamePlayedOurDetailEntity[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  getShirtNumberByPositionAtBat(posAtBat: number): any[] {
    //OrderRowFirst
    //OrderRowContinue
    let positionData = this.detailOfOurGame.find(f => f.positionAtBat == posAtBat);
    let result = [
      {
        class: "OrderRowFirst",
        value: 26
      },
      {
        class: "OrderRowContinue",
        value: 27
      },
      {
        class: "OrderRowContinue",
        value: 28
      }];
    return result;
  }
}
