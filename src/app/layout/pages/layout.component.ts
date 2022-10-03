import { Component, OnInit } from "@angular/core";
import { SideNavToggle } from "../interfaces/sidenav-toggle.interface";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  sidebarColor: string = "red";
  isSideNavCollapsed = true;
  screenWidth = 0;

  constructor() { }
  changeDashboardColor(color: string) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() { }
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
