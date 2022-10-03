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
  { path: "/finance/dashboard", title: "Tablero", itemKey: "Dashboard", group: "FINANCE" }
];
