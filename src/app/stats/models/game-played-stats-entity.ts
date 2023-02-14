import { GamePlayedEntity } from "./game-played-entity";
import { GamePlayedOurDetailEntity } from "./game-played-our-detail";
import { GamePlayedRivalDetailEntity } from "./game-played-rival-detail";

export class GamePlayedStatsEntity {
  game: GamePlayedEntity;
  detailOfOurGame: GamePlayedOurDetailEntity[];
  detailOfTheRivalGame: GamePlayedRivalDetailEntity[];

  constructor() {
    this.game = new GamePlayedEntity();;
    this.detailOfOurGame = [];
    this.detailOfTheRivalGame = [];
  }
}
