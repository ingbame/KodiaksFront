import { Routes } from "@angular/router";
import { MembersComponent } from "../pages/members/members.component";
import { MenuComponent } from "../pages/menu/menu.component";
import { RolesComponent } from "../pages/roles/roles.component";

export const ApplicationRoutes: Routes = [
  { path: "members", component: MembersComponent },
  { path: "roles", component: RolesComponent },
  { path: "menu", component: MenuComponent }
];
