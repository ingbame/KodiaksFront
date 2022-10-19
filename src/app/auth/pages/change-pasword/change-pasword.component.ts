import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LoginEntity } from '../../models/login';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.scss']
})
export class ChangePaswordComponent implements OnInit {
  logUsr: LoginEntity = new LoginEntity();
  isMatch: boolean = false;
  have8: boolean = false;

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.logUsr.userName = this.session.nameIdentifier;
  }
  onKeyUp(): void {
    let pasword1 = document.getElementById("password1") as HTMLInputElement;
    let pasword2 = document.getElementById("password2") as HTMLInputElement;
    let char8 = document.getElementById("8char") as HTMLSpanElement;
    let pwmatch = document.getElementById("pwmatch") as HTMLSpanElement;

    if (pasword1.value.length >= 8) {
      char8.classList.remove("fa-xmark");
      char8.classList.add("fa-check");
      char8.style.color = "green";
      this.have8 = true
    } else {
      char8.classList.remove("fa-check");
      char8.classList.add("fa-xmark");
      char8.style.color = "red";
      this.have8 = false;
    }

    if (pasword1.value == pasword2.value) {
      pwmatch.classList.remove("fa-xmark");
      pwmatch.classList.add("fa-check");
      pwmatch.style.color = "green";
      this.isMatch = true;
    } else {
      pwmatch.classList.remove("fa-check");
      pwmatch.classList.add("fa-xmark");
      pwmatch.style.color = "red";
      this.isMatch = false;
    }
  }
  OnSubmit(): void {
    if ((this.logUsr?.userName?.trim() ?? "") == "")
      return;
    if ((this.logUsr?.password?.trim() ?? "") == "")
      return;
    if (!this.isMatch)
      return;
    if (!this.have8)
      return;

    this.authService.cangePassword(this.logUsr.userName, this.logUsr.password)
      .subscribe(
        {
          next: (res) => {
            if (!res.error) {
              localStorage.removeItem('authUser');
              this.router.navigateByUrl('/home');
            }
          },
          error: (err) => {
            this.helper.httpCatchError(err);
          },
          complete: () => {
          }
        });
  }
}
