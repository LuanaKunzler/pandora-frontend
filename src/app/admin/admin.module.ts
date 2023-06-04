import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './template/admin-header/admin-header.component';
import { AdminSidenavComponent } from './template/admin-sidenav/admin-sidenav.component';
import { AdminFooterComponent } from './template/admin-footer/admin-footer.component';
import { ProductsComponent } from './products/products.component';
import { MatExpansionModule } from '@angular/material/expansion'

@NgModule({
  declarations: [AdminComponent, AdminHeaderComponent, AdminSidenavComponent, AdminFooterComponent, ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    ReactiveFormsModule,
    NgbModule,
    AlertModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
