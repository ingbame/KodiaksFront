import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { RoleGuard } from "src/app/shared/guards/role.guard";
import { GamePlayedStatsPageComponent } from "../components/stats/game-played-stats-page/game-played-stats-page.component";
import { RivalTeamPageComponent } from "../components/stats/rival-team-page/rival-team-page.component";
import { TeamStatsPageComponent } from "../components/stats/team-stats-page/team-stats-page.component";
import { PositionsComponent } from "../pages/positions/positions.component";
import { RosterComponent } from "../pages/roster/roster.component";
import { StatsComponent } from "../pages/stats/stats.component";

export const StatsRoutes: Routes = [
  { path: "positions", component: PositionsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin", "Admin"] } },
  { path: "roster", component: RosterComponent, canActivate: [AuthGuard] },
  {
    path: "stats", component: StatsComponent, canActivate: [AuthGuard],
    children: [
      { path: "teamStats", component: TeamStatsPageComponent, canActivate: [AuthGuard] },
      { path: "gamePlayedStats", component: GamePlayedStatsPageComponent, canActivate: [AuthGuard] },
      { path: "rivalTeam", component: RivalTeamPageComponent, canActivate: [AuthGuard] }
    ]
  }
];
