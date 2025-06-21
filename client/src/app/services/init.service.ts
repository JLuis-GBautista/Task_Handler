import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  async init(): Promise<void> {
    try {
      const { accessToken } = await this.auth.refreshSession();
      const user = await this.auth.session(accessToken);
      this.auth.setSession(accessToken, user);
      this.router.navigate(['/']);
    } catch (e) {
      this.auth.clearSession();
      this.router.navigate(['/auth']);
    }
  }
}
