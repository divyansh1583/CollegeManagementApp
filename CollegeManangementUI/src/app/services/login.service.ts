import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../models/login.modal';
import { catchError, Observable } from 'rxjs';
import { RegisterDetail } from '../models/registerDetails.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7097'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Corresponds to UserController.GetUsers
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  // Corresponds to UserController.LoginAsync
  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginDetails);
  }

  // Corresponds to UserController.Register
  register(registerDetail: RegisterDetail): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerDetail);
  }

  // Corresponds to UserController.Update
  updateUser(userDetail: RegisterDetail): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, userDetail);
  }

  // Corresponds to UserController.Delete
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}