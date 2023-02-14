export class GamePlayedDetailEntity {
  detailId?: number;
  gameId?: number;
  positionAtBat?: number;
  isRun?: boolean;
  isHit?: boolean;
  isDouble?: boolean;
  isTriple?: boolean;
  isHomeRun?: boolean;
  runsBattedIn?: number;
  walks?: number;
  strikeOut?: number;
  stolenBases?: number;
  caughtStealing?: number;
  isOut?: boolean;
  outValue?: number;
  outSector?: number;
  centerValue?: string;
  isPitcher?: boolean;
}
