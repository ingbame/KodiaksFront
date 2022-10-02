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



@NgModule({
  declarations: [
    MovementsComponent,
    DashboardComponent,
    ConceptsComponent,
    NewModalComponent,
    DetailModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(FinanceRoutes)
  ]
})
export class FinanceModule { }
