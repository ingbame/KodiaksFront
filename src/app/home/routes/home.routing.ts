import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { MainComponent } from "../pages/main/main.component";

export const HomeRoutes: Routes = [
  {
    path: "", component: MainComponent, canActivate: [AuthGuard]
  }
];
