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
import { TeamTableComponent } from './components/stats/team-table/team-table.component';
import { RivalTeamPageComponent } from './components/stats/rival-team-page/rival-team-page.component';
import { RivalTeamModalNewComponent } from './components/stats/rival-team-modal-new/rival-team-modal-new.component';
import { GamePlayedStatsPageComponent } from './components/stats/game-played-stats-page/game-played-stats-page.component';
import { TeamStatsPageComponent } from './components/stats/team-stats-page/team-stats-page.component';



@NgModule({
  declarations: [
    StatsComponent,
    PositionsComponent,
    RosterComponent,
    DetailModalComponent,
    NewModalComponent,
    TeamTableComponent,
    RivalTeamPageComponent,
    RivalTeamModalNewComponent,
    GamePlayedStatsPageComponent,
    TeamStatsPageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(StatsRoutes),
    SharedModule
  ]
})
export class StatsModule { }
