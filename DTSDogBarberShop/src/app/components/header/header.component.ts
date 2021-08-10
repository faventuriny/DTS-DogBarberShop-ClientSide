import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = '';
  userNameSubscription: Subscription;
  showName = false;

  constructor(private authService: AuthService, private router: Router) {
    this.userNameSubscription = this.authService.userNameObservable.subscribe((data)=> {
      if(data !== '' && data != undefined){
        this.userName = data
        this.showName = true;
      } else {
        this.showName = false;
      }
    })
  }

  ngOnInit(): void {
    let userName = this.authService.getUserName()
    if(userName !== ''){
      this.showName = true;
      this.userName = userName;
    } else {
      this.showName = false;
    }
  }

  onClickLogout() {
    console.log("onClickLogout()");
    this.authService.resetUser();
    this.showName = false;
    this.router.navigateByUrl("/login");
  }

}
