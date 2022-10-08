import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  constructor(
    private templateRef: TemplateRef<any>
  ) { }

}
