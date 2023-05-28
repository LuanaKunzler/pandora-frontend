import { AuthGuardService } from '../services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] }
];