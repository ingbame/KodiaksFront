import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Extentions {
  refreshToken(token: string): void {
    localStorage.setItem('authUser', JSON.stringify({ token: token }));
  }
}
