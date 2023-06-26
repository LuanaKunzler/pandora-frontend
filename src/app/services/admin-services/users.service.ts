import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/store/model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "http://localhost:8080/api/admin"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  snackBarToast(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  createUser(user: any) {
    return this.http.post(this.baseUrl + '/user', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/user/${id}`);
  }

  updateUser(id: any, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + `/user/${id}`, user);
  }
}
