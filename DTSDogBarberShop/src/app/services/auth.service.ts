import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userNameSubject =  new Subject<string>();
  userNameObservable = this.userNameSubject.asObservable();

  constructor(private http: HttpClient) {}


  private handleLoginResponse(res:any){
    console.log('handleLoginResponse()',res);

    let user :User = {
      name: res.userName,
      token: res.token,
      id: res.userId
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    this.userNameSubject.next(res.userName);
  }

  getUser() {
    let userAsAString = sessionStorage.getItem('user');
    if(userAsAString === null){
      return null
    }
    return JSON.parse(userAsAString)
  }
  getUserName(){
    let user = this.getUser()
    if(user !== null){
      return user.name;
    } else {
      return ''
    }
  }
  getUserToken(){
    let user = this.getUser()
    if(user !== null){
      return user.token;
    } else {
      return '';
    }
  }
  getUserId(){
    let user = this.getUser()
    if(user !== null){
      return user.id;
    } else {
      return '';
    }
  }
  resetUser() {
    sessionStorage.removeItem('user')
    this.userNameSubject.next('');
  }

  login(userDetails: { email: string, password: string }) {
    return this.http.post(
      environment.apiUrl + "/auth/login",
      userDetails
    ).pipe(
        take(1),
        tap(data => this.handleLoginResponse(data),
          error => console.log("auth.service error while login:",error))
    );
  }

  createNewUser(userDetails: any){
    return this.http.post(
      environment.apiUrl + '/auth/register',
      userDetails
    )
    .pipe(
      take(1),
      tap(data => this.handleLoginResponse(data),
      error => console.log("auth.service error while create new user:",error))
    )
  }
}
