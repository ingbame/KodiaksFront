import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { ChangePaswordComponent } from "../pages/change-pasword/change-pasword.component";
import { LoginComponent } from "../pages/login.component";

export const AuthRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "chage-pswrd", component: ChangePaswordComponent, canActivate: [AuthGuard] }
];
