import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationEnum } from '../enums/notification-enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationUtility {
  constructor(private toastr: ToastrService) { }

  show(type: NotificationEnum, title: string, message: any) {
    switch (type) {
      case NotificationEnum.info:
        this.toastr.info(message, title, {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.success:
        this.toastr.success(message, title, {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.warning:
        this.toastr.warning(message, title, {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.error:
        this.toastr.error( message, title, {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.show:
        this.toastr.show(message, title, {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
        break;
    }
  }
}
