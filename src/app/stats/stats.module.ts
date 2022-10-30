import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './pages/stats/stats.component';
import { PositionsComponent } from './pages/positions/positions.component';
import { RosterComponent } from './pages/roster/roster.component';
import { RouterModule } from '@angular/router';
import { StatsRoutes } from './routes/stats.routing';
import { DetailModalComponent } from './components/roster/detail-modal/detail-modal.component';
import { NewModalComponent } from './components/roster/new-modal/new-modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, NgForm } from '@angular/forms';



@NgModule({
  declarations: [
    StatsComponent,
    PositionsComponent,
    RosterComponent,
    DetailModalComponent,
    NewModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(StatsRoutes),
    SharedModule
  ]
})
export class StatsModule { }
