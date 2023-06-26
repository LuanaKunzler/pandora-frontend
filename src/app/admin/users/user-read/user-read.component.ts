import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserReadDataSource } from './user-read-datasource';
import { User } from 'src/app/store/model';
import { UsersService } from 'src/app/services/admin-services/users.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.scss']
})
export class UserReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource: UserReadDataSource;

  users: User[] = [];

  displayedColumns = ['id', 'name', 'email', 'address', 'phone', 'role', 'emailVerified', 'status', 'registrationDate', 'socialPovider', 'action'];

  constructor(private service: UsersService) {
    this.dataSource = new UserReadDataSource();
  }
  
  ngOnInit(): void {
    this.service.getUsers().subscribe(users => {
      this.users = users;      
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.users;
  }

  getSocialProviderLabel(socialProvider: string): string {
    switch (socialProvider) {
      case 'GOOGLE':
        return 'Google';
      case 'USER':
        return 'Usuário';
      case 'ADMIN':
        return 'Administrador';
      default:
        return '';
    }
  }

  getRoleLabel(roles: any[]): string {
    const roleNames = roles.map(role => {
      if (role.name.includes('ROLE_ADMIN')) {
        return 'Administrador';
      } else if (role.name.includes('ROLE_USER')) {
        return 'Usuário';
      } else {
        return role.name;
      }
    });
    return roleNames.join(' / ');
  } 
  
}
