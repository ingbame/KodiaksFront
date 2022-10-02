import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './routes/auth.routing';
import { NgParticlesModule } from 'ng-particles';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgParticlesModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthModule { }
