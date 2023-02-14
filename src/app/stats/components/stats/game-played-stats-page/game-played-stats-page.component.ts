import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/auth/services/session.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { GamePlayedEntity } from 'src/app/stats/models/game-played-entity';
import { GamePlayedStatsEntity } from 'src/app/stats/models/game-played-stats-entity';

@Component({
  selector: 'app-game-played-stats-page',
  templateUrl: './game-played-stats-page.component.html',
  styleUrls: ['./game-played-stats-page.component.scss']
})
export class GamePlayedStatsPageComponent implements OnInit {
  gamePlayedModel: GamePlayedStatsEntity = {
    game: {
      gameId: 1,
      rivalTeamId: 1,
      rivalData: {
        rivalTeamId: 1,
        teamName: "La Furia",
        isActive: true
      }
    },
    detailOfOurGame: [],
    detailOfTheRivalGame: []
  };
  lstGamesPlayed: GamePlayedEntity[] = [
    {
      gameId: 1,
      rivalTeamId: 1,
      rivalData: {
        rivalTeamId: 1,
        teamName: "La Furia",
        isActive: true
      },
      date: new Date(Date.now()),
      weWon: false
    },
    {
      gameId: 2,
      rivalTeamId: 2,
      rivalData: {
        rivalTeamId: 2,
        teamName: "Kodiaks",
        isActive: true
      },
      date: new Date(),
      weWon: true
    }
  ];
  constructor(
    private helper: HelperService,
    private session: SessionService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onDdlDateGameChange(event: any) {
    this.gamePlayedModel.game.gameId = event.target.selectedOptions[0].dataset.id;
  }
}
