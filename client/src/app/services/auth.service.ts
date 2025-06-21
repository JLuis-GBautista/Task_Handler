import { inject, Injectable, OnInit, signal } from '@angular/core';
import { AuthResponse, LogoutResponse, RefreshResponse, SessionResponse } from '../types/auth';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  domain = environment.apiBack;
  accessToken = signal<string | null>(null);
  user = signal<SessionResponse | null>(null);


  setToken(accessToken: string) {
    this.accessToken.set(accessToken);
  }

  setSession(accessToken: string, user: SessionResponse) {
    this.accessToken.set(accessToken);
    this.user.set(user);
  }

  async refresh() {
    const {accessToken} = await this.refreshSession();
    const user = await this.session(accessToken);
    this.setSession(accessToken, user);
    return {accessToken};
  }

  clearSession() {
    this.accessToken.set(null);
    this.user.set(null);
    this.logout();
  }
  
  async register(data: { name: string; email: string; password: string }) {
    return await firstValueFrom(
      this.http.post<AuthResponse>(
        `${this.domain}/auth/register`,
        data,
        { withCredentials: true }
      )
    );
  }

  async login(data: { email: string; password: string }) {
    return await firstValueFrom(
      this.http.post<AuthResponse>(
        `${this.domain}/auth/login`,
        data,
        { withCredentials: true }
      )
    );
  }

  async logout() {
    return await firstValueFrom(this.http.get<LogoutResponse>(`${this.domain}/auth/logout`, {
      withCredentials: true,
    }))
  }

  
  async refreshSession() {
    return await firstValueFrom(this.http.get<RefreshResponse>(this.domain+'/auth/refresh', {
      withCredentials: true
    }));

  }
  async session(token: string) {
    return await firstValueFrom(this.http.get<SessionResponse>(this.domain+'/user/session', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    }));
  }
}
