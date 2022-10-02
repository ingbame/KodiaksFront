import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { NextGamesComponent } from './pages/next-games/next-games.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeRoutes } from './routes/home.routing';



@NgModule({
  declarations: [
    MainComponent,
    NextGamesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes)
  ]
})
export class HomeModule { }
