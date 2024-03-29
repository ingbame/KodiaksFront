import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClickMode, Container, Engine, HoverMode, MoveDirection, OutMode } from 'tsparticles-engine';
import { loadFull } from "tsparticles";
import { LoginEntity } from '../models/login';
import { AuthService } from '../services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SessionService } from '../services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  particlesId: string = "tsparticles"
  particlesOptions: any = {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: {
        value: "#132849"
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#FFFFFF"
      },
      links: {
        color: "#FEC52E",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: false,
        speed: 3,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 150
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "triangle"
      },
      size: {
        value: { min: 1, max: 5 },
      }
    },
    detectRetina: true
  };

  logUsr: LoginEntity = new LoginEntity();
  urlRedirect?: string;

  constructor(
    private helper: HelperService,
    private session: SessionService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.session.token = "";
    this.activedRoute.paramMap.subscribe(param => {
      if (param.get('url') && param.get('url')!!.length > 0) {
        this.urlRedirect = param.get('url')!!;
      }
    });
  }
  particlesLoaded(container: Container): void { }

  async particlesInit(engine: Engine): Promise<void> {
    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }

  showPassword(e: any): void {
    const txtPasswordElement: any = document.getElementById("txtPassword");
    if (e.currentTarget.checked) {
      txtPasswordElement.type = "text";
    } else {
      txtPasswordElement.type = "password";
    }
  }

  OnSubmit(): void {
    if ((this.logUsr?.userName?.trim() ?? "") == "")
      return;
    if ((this.logUsr?.password?.trim() ?? "") == "")
      return;

    this.spinner.show();
    this.authService.login(this.logUsr.userName, this.logUsr.password)
      .subscribe(
        {
          next: (res) => {
            localStorage.setItem('authUser', JSON.stringify(res.token));
            if (this.logUsr.password === `Kodiaks${this.logUsr.userName?.substring(this.logUsr.userName.length - 4)}`) {
              this.router.navigateByUrl('/login/chage-pswrd');
              return;
            }
            if (!this.urlRedirect) {
              this.router.navigateByUrl('');
            } else {
              this.router.navigateByUrl(this.urlRedirect);
            }
          },
          error: (err) => {
            this.helper.httpCatchError(err);
          },
          complete: () => {
            this.spinner.hide();
          }
        });
  }
}
