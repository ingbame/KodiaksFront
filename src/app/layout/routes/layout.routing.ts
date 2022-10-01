import { Routes } from "@angular/router";

export const LayoutRoutes: Routes = [
  {
    path: "home",
    loadChildren: () => import("../../home/home.module").then(m => m.HomeModule)
  },
  {
    path: "app",
    loadChildren: () => import("../../application/application.module").then(m => m.ApplicationModule)
  },
  {
    path: "finance",
    loadChildren: () => import("../../finance/finance.module").then(m => m.FinanceModule)
  },
  {
    path: "stats",
    loadChildren: () => import("../../stats/stats.module").then(m => m.StatsModule)
  }
];
