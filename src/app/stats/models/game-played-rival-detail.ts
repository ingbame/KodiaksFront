import { GamePlayedDetailEntity } from "./game-played-detail";
import { OpposingTeamMemberEntity } from "./opposing-team-member-entity";

export class GamePlayedRivalDetailEntity extends GamePlayedDetailEntity {
  RivalDetailId?: number;
  memberId?: number;
  member: OpposingTeamMemberEntity = new OpposingTeamMemberEntity();
  inning?: number;
}
