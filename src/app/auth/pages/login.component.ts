import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationEnum } from 'src/app/shared/enums/notification-enum';
import { NotificationUtility } from 'src/app/shared/utilities/notification';
import { LoginEntity } from '../models/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logUsr: LoginEntity = new LoginEntity();
  urlRedirect?: string;

  constructor(private authService: AuthService, private router: Router, private activedRoute: ActivatedRoute,private notification: NotificationUtility) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(param => {
      if (param.get('url') && param.get('url')!!.length > 0) {
        this.urlRedirect = param.get('url')!!;
      }
    });
  }

  OnSubmit(): void {
    if (!this.Validate(this.logUsr?.userName ?? "", "userName", "phone"))
      return;
    if (!this.Validate(this.logUsr?.password ?? "", "password"))
      return;

    this.authService.login(this.logUsr.userName, this.logUsr.password)
      .subscribe(
        {
          next: (res) => {
            localStorage.setItem('authUser', JSON.stringify(res));

            if (!this.urlRedirect) {
              this.router.navigateByUrl('');
            } else {
              this.router.navigateByUrl(this.urlRedirect);
            }


          },
          error: (err) => {
            this.notification.show(NotificationEnum.error, "Error", err.error);
          },
          complete: () => { }
        });
  }

  Validate(inputStr: any, elementName: string, type?: string): boolean {
    switch (type) {
      case "email":
        if (inputStr.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
          this.showHideValidate(elementName, true);
          return false;
        }
        break;
      case "phone":
        if (inputStr.trim().match(/^\d{10}$/) == null) {
          this.showHideValidate(elementName, true);
          return false;
        }
        break;
      default:
        if (inputStr.trim() == "") {
          this.showHideValidate(elementName, true);
          return false;
        }
        break;
    }
    this.showHideValidate(elementName, false);
    return true;
  }

  showHideValidate(inputName: string, show: boolean): void {
    var thisAlert = document.getElementsByName(inputName)[0].parentElement;
    if (show)
      thisAlert?.classList.add("alert-validate");
    else
      thisAlert?.classList.remove("alert-validate");
  }
}
