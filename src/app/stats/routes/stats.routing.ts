import { Routes } from "@angular/router";
import { PositionsComponent } from "../pages/positions/positions.component";
import { RosterComponent } from "../pages/roster/roster.component";
import { StatsComponent } from "../pages/stats/stats.component";

export const StatsRoutes: Routes = [
  { path: "positions", component: PositionsComponent },
  { path: "roster", component: RosterComponent },
  { path: "stats", component: StatsComponent }
];
