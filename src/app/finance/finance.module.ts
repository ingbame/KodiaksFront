import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsComponent } from './pages/movements/movements.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConceptsComponent } from './pages/concepts/concepts.component';
import { RouterModule } from '@angular/router';
import { FinanceRoutes } from './routes/finance.routing';
import { NewModalComponent } from './components/movements/new-modal/new-modal.component';
import { DetailModalComponent } from './components/movements/detail-modal/detail-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChartInOutsMovComponent } from './components/dashboard/chart-in-outs-mov/chart-in-outs-mov.component';
import { ChartInOutsMovGComponent } from './components/dashboard/chart-in-outs-mov-g/chart-in-outs-mov-g.component';



@NgModule({
  declarations: [
    MovementsComponent,
    DashboardComponent,
    ConceptsComponent,
    NewModalComponent,
    DetailModalComponent,
    ChartInOutsMovComponent,
    ChartInOutsMovGComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(FinanceRoutes),
    SharedModule
  ],
  exports: [
    ChartInOutsMovComponent
  ]
})
export class FinanceModule { }
