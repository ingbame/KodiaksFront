import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { RoleGuard } from "src/app/shared/guards/role.guard";
import { ConceptsComponent } from "../pages/concepts/concepts.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { MovementsComponent } from "../pages/movements/movements.component";

export const FinanceRoutes: Routes = [
  { path: "concepts", component: ConceptsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin"] } },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "movements", component: MovementsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin", "Admin"] } }
];
