import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-style.css','./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  form!: FormGroup
  email: any
  password: any

  errorMsg = ''
  isShowErrorMsg = false

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.compose([Validators.minLength(4), Validators.required])),
    })

    this.email = this.form.get('email')
    this.password = this.form.get('password')
  }

  onSubmit(userDetails: any) {
    this.authService.login(userDetails).subscribe(()=>{
      this.router.navigateByUrl('/waiting-list')
    }, (error)=>{
      console.log(error);

      this.isShowErrorMsg = true;
      if(error.error.errors[0] === undefined){
        this.errorMsg = error.message;
      } else {
        this.errorMsg = error.error.errors[0]
      }
    })

  }

}
