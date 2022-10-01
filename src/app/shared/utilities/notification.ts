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
        this.toastr.info('<i class="tim-icons icon-bell-55" [data-notify]="icon"></i>'+ message, title, {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.success:
        this.toastr.success('<i class="tim-icons icon-bell-55" [data-notify]="icon"></i>'+ message, title, {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.warning:
        this.toastr.warning('<i class="tim-icons icon-bell-55" [data-notify]="icon"></i>'+ message, title, {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.error:
        this.toastr.error('<i class="tim-icons icon-bell-55" [data-notify]="icon"></i>'+ message, title, {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
        break;
      case NotificationEnum.show:
        this.toastr.show('<i class="tim-icons icon-bell-55" [data-notify]="icon"></i>'+ message, title, {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
        break;
    }
  }
}
