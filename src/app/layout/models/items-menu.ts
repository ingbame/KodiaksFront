declare interface RouteInfo {
  path: string;
  title: string;
  itemKey: string;
  group: string;
  icon?: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "/home", title: "Inicio", itemKey: "Home", group: "" },
  { path: "/app/roles", title: "Roles", itemKey: "Roles", group: "APP" },
  { path: "/app/menu", title: "Menu", itemKey: "Menu", group: "APP" },
  { path: "/app/members", title: "Miembros", itemKey: "Members", group: "APP" },
  { path: "/stats/stats", title: "Estadísticas", itemKey: "Stats", group: "STATS" },
  { path: "/stats/positions", title: "Posiciones", itemKey: "Positions", group: "STATS" },
  { path: "/stats/roster", title: "Roster", itemKey: "Roster", group: "STATS" },
  { path: "/finance/concepts", title: "Conceptos", itemKey: "Concepts", group: "FINANCE" },
  { path: "/finance/movements", title: "Movimientos", itemKey: "Movements", group: "FINANCE" },
  { path: "/finance/dashboard", title: "Tablero", itemKey: "Dashboard", group: "FINANCE" },

  //Layout examples
  { path: "/examples/dashboard", title: "Dashboard", itemKey: "لوحة القيادة", icon: "icon-chart-pie-36", group: "" },
  { path: "/examples/icons", title: "Icons", itemKey: "الرموز", icon: "icon-atom", group: "" },
  { path: "/examples/maps", title: "Maps", itemKey: "خرائط", icon: "icon-pin", group: "" },
  { path: "/examples/notifications", title: "Notifications", itemKey: "إخطارات", icon: "icon-bell-55", group: "" },
  { path: "/examples/user", title: "User Profile", itemKey: "ملف تعريفي للمستخدم", icon: "icon-single-02", group: "" },
  { path: "/examples/tables", title: "Table List", itemKey: "قائمة الجدول", icon: "icon-puzzle-10", group: "" },
  { path: "/examples/typography", title: "Typography", itemKey: "طباعة", icon: "icon-align-center", group: "" },
  { path: "/examples/rtl", title: "RTL Support", itemKey: "ار تي ال", icon: "icon-world", group: "" }
];
