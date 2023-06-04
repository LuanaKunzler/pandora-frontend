import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthGuardService } from "../services/auth-guard.service";

export const AdminRoutes: Routes = [
    {
      path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]
    }
  ];