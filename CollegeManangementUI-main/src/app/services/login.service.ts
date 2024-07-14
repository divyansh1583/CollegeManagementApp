import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../models/login.modal';
import { catchError, Observable } from 'rxjs';
import { RegisterDetail } from '../models/registerDetails.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7097/api/User'; // Replace with your API URL

  constructor(private http: HttpClient) { }


  // Corresponds to AdminUserController.LoginAsync
  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginDetails);
  }

  //register
  register( registerDetail :RegisterDetail ):Observable<any>{
    console.log(registerDetail);
    return this.http.post<any>(`${this.apiUrl}/register`, registerDetail);
  }
 
}
