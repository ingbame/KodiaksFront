import { Directive, ElementRef, Input } from '@angular/core';
import { SessionService } from 'src/app/auth/services/session.service';

@Directive({
  selector: '[appCanEdit]'
})
export class CanEditDirective {
  private permissions: any = [];

  constructor(
    private element: ElementRef,
    private session: SessionService
  ) { }

  @Input()
  set appCanEdit(val: string[]) {
    if (val.length > 0) {
      this.permissions = val;
      this.setDisabled(this.checkPermissions());
    } else
      this.setDisabled(this.session.canEdit);
  }
  private setDisabled(hasPermission: boolean): void {
    if (hasPermission)
      this.element.nativeElement.disabled = false;
    else
      this.element.nativeElement.disabled = true;
  }
  private checkPermissions(): boolean {
    let hasPermission = false;
    if (this.session && this.session.role) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.session.role.toUpperCase() === checkPermission.toUpperCase();
        if (permissionFound) {
          hasPermission = this.session.canEdit;
          break;
        }
      }
    }
    return hasPermission;
  }
}
