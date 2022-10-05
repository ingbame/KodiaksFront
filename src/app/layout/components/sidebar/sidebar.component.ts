import { Component, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { ROUTES } from "../../models/items-menu";
import { LayoutService } from "../../services/layout.service";

import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationUtility } from "src/app/shared/utilities/notification";
import { NotificationEnum } from "src/app/shared/enums/notification-enum";
import { SideNavToggle } from "../../interfaces/sidenav-toggle.interface";

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
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }else{
      this.collapsed = true;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

    }
  }
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private notification: NotificationUtility) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.layoutService.GetMenu().subscribe({
      next: (res) => {
        res.forEach((item: any) => {
          let itemVal: any = ROUTES.filter(menuItem => menuItem.itemKey == item.itemKey)[0];
          if (itemVal != undefined) {
            itemVal.icon = item.iconSource;
            this.menuItems.push(itemVal)
          }
        });
      },
      error: (err) => {
        this.notification.show(NotificationEnum.error, "Error", err.error);
      },
      complete: () => { }
    });
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
