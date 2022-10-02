import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './pages/stats/stats.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { RosterComponent } from './pages/roster/roster.component';
import { RouterModule } from '@angular/router';
import { StatsRoutes } from './routes/stats.routing';



@NgModule({
  declarations: [
    StatsComponent,
    PositionsComponent,
    RosterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(StatsRoutes)
  ]
})
export class StatsModule { }
