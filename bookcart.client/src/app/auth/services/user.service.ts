import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = 'https://localhost:7186/api/User';
  cartItemcount$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  registerUser(userDetails: any) {
    return this.http.post(`${this.baseURL}/RegisterUser`, userDetails).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getCartItemCount(userId: number) {
    return this.http.get(`${this.baseURL}/${userId}`).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  validateUserName(userName: string) {
    return this.http.get(`${this.baseURL}/validateUsername/${userName}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
