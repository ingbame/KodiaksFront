import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { RoleGuard } from "src/app/shared/guards/role.guard";
import { PositionsComponent } from "../pages/positions/positions.component";
import { RosterComponent } from "../pages/roster/roster.component";
import { StatsComponent } from "../pages/stats/stats.component";

export const StatsRoutes: Routes = [
  { path: "positions", component: PositionsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin", "Admin"] } },
  { path: "roster", component: RosterComponent, canActivate: [AuthGuard] },
  { path: "stats", component: StatsComponent, canActivate: [AuthGuard] }
];
