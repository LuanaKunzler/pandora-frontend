import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/admin-services/users.service';

//const columns = ['id', 'firstName', 'lastName', 'email', 'permissoes', 'verificado', 'status', 'acoes'];
@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userSaved: boolean = false;
  
  constructor(private service: UsersService) {}


ngOnInit(): void {

}
 

}
