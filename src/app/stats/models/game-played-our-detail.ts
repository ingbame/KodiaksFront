import { MemberEntity } from "src/app/application/models/member";
import { GamePlayedDetailEntity } from "./game-played-detail";

export class GamePlayedOurDetailEntity extends GamePlayedDetailEntity {
  ourDetailId?: number;
  memberId?: number;
  member: MemberEntity = new MemberEntity();
  inning?: number;
}
