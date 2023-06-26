import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { ConfigsComponent } from './configs/configs.component';
import { AdminAuthGuard } from '../services/admin-guard.service';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';

const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'authors', component: AuthorsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'configs', component: ConfigsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'discounts', component: DiscountsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/update/:id', component: UserUpdateComponent }
    ],
  },
];

export default AdminRoutes;