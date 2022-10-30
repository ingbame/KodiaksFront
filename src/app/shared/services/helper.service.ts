import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationEnum } from '../enums/notification-enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  showMessage(type: NotificationEnum, title: string, message: any) {
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
        this.toastr.error(message, title, {
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

  httpCatchError(err: any) {
    this.spinner.hide();
    if (err.error != null)
      this.showMessage(NotificationEnum.error, "Error", err.error);
    else {
      switch (err.status) {
        case 401: //Unauthorized
          this.showMessage(NotificationEnum.error, "Error", "No autorizado");
          break;
        case 403: //Forbidden
          this.showMessage(NotificationEnum.error, "Error", "No tiene los permisos para acceder");
          break;
        case 404: //Not Found
          this.showMessage(NotificationEnum.error, "Error", "Página no encontrada");
          break;
      }
    }
  }
}
