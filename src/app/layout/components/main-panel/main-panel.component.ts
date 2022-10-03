import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  @Input() collapsed: boolean = true;
  @Input() screenWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getBodyClass(): string {
    let styleClass = "";
    if (this.collapsed && this.screenWidth > 768)
      styleClass = "main-panel-trimmed";
    else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0)
    styleClass = "main-panel-md-screen";
    else if (this.collapsed && this.screenWidth <= 450 && this.screenWidth > 0)
      styleClass = "main-panel-full-screen";
    return styleClass;
  }
}
