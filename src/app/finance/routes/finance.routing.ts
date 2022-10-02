import { Routes } from "@angular/router";
import { ConceptsComponent } from "../pages/concepts/concepts.component";
import { DashboardComponent } from "../pages/dashboard/dashboard.component";
import { MovementsComponent } from "../pages/movements/movements.component";

export const FinanceRoutes: Routes = [
  { path: "concepts", component: ConceptsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "movements", component: MovementsComponent }
];
