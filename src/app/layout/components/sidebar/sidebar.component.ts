import { Component, OnInit } from "@angular/core";
import { ROUTES } from "../../models/items-menu";
import { LayoutService } from "../../services/layout.service";

import jwt_decode from "jwt-decode";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationUtility } from "src/app/shared/utilities/notification";
import { NotificationEnum } from "src/app/shared/enums/notification-enum";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  urlRedirect?: string;
  menuItems: any[] = [];

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private notification: NotificationUtility) { }

  ngOnInit() {
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
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
