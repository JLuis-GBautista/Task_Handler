import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { InitService } from '../../services/init.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private init = inject(InitService);
  private router = inject(Router);

  showLogin = signal(true);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  toggleForm() {
    this.showLogin.update((val) => !val);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.auth.login({email: data.email!, password: data.password!}).then(structToken => {
        this.auth.session(structToken.accessToken).then(session => {
          this.auth.setSession(structToken.accessToken, session);
          this.router.navigate(['/']);
        }).catch(e => console.log(e));
      }).catch(e => console.log(e));

      console.log('Login', this.loginForm.value);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.auth.register({name: data.name!, email: data.email!, password: data.password!}).then(structToken => {
        this.auth.session(structToken.accessToken).then(session => {
          this.auth.setSession(structToken.accessToken, session);
          this.router.navigate(['/']);
        }).catch(e => console.log(e));
      }).catch(e => console.log(e));
      console.log('Register', this.registerForm.value);
    }
  }
}
