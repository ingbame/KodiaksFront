import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from 'src/app/auth/services/session.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {
  private permissions: any = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private session: SessionService
  ) { }
  ngOnInit(): void {
    this.updateView();
  }
  @Input()
  set appRole(val: string[]) {
    this.permissions = val;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
  private checkPermissions(): boolean {
    let hasPermission = false;
    if(this.session && this.session.role){
      for (const checkPermission of this.permissions) {
        const permissionFound = this.session.role.toUpperCase() === checkPermission.toUpperCase();
        if(permissionFound){
          hasPermission = true;
          break;
        }
      }
    }
    return hasPermission;
  }
}
