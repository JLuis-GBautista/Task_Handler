import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: MainComponent },
//  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/auth' }
];
