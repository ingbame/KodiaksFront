import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './directives/role.directive';
import { CanEditDirective } from './directives/can-edit.directive';



@NgModule({
  declarations: [
    RoleDirective,
    CanEditDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoleDirective,
    CanEditDirective
  ]
})
export class SharedModule { }
