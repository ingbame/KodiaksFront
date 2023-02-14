import { RivalTeamEntity } from "./rival-team";

export class GamePlayedEntity {
  gameId?: number;
  rivalTeamId?: number;
  rivalData: RivalTeamEntity;
  date?: Date;
  weWon?: boolean;
  /**
   *
   */
  constructor() {
    this.rivalData = new RivalTeamEntity();
  }
}
