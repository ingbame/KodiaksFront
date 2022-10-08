import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { RoleGuard } from "src/app/shared/guards/role.guard";
import { MembersComponent } from "../pages/members/members.component";
import { MenuComponent } from "../pages/menu/menu.component";
import { RolesComponent } from "../pages/roles/roles.component";

export const ApplicationRoutes: Routes = [
  { path: "members", component: MembersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin", "Admin"] } },
  { path: "roles", component: RolesComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin"] } },
  { path: "menu", component: MenuComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRoles: ["SuperAdmin"] } }
];
