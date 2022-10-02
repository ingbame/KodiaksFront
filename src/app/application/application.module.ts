import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './pages/members/members.component';
import { RolesComponent } from './pages/roles/roles.component';
import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from './routes/application.routing';
import { MenuComponent } from './pages/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberModalComponent } from './components/members/member-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MembersComponent,RolesComponent, MenuComponent,  MemberModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(ApplicationRoutes)
  ],
  bootstrap:[MembersComponent]
})
export class ApplicationModule { }
