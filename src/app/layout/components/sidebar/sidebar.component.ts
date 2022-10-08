import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { ROUTES } from "../../models/items-menu";
import { LayoutService } from "../../services/layout.service";
import { SideNavToggle } from "../../interfaces/sidenav-toggle.interface";
import { HelperService } from "src/app/shared/services/helper.service";
import { SessionService } from "src/app/auth/services/session.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean = false;
  screenWidth: number = 0;
  urlRedirect?: string;
  menuItems: any[] = [];

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    } else {
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

    }
  }
  constructor(
    private helper: HelperService,
    private session: SessionService,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    if (this.menuItems.length <= 0) {
      this.layoutService.GetMenu().subscribe({
        next: (res) => {
          if (!res?.token || res.token != "") {
            this.session.token = res.token;
            res.response.forEach((item: any) => {
              let itemVal: any = ROUTES.filter(menuItem => menuItem.itemKey == item.itemKey)[0];
              if (itemVal != undefined) {
                itemVal.icon = item.iconSource;
                this.menuItems.push(itemVal)
              }
            });
          }
        },
        error: (err) => {
          this.helper.httpCatchError(err);
        },
        complete: () => { }
      });
    }
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
