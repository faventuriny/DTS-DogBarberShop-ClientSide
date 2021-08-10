import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['../auth-style.css','./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  form!: FormGroup;
  name: any
  email: any
  password: any
  passwordConfirm: any

  errorMsg = ''
  isShowErrorMsg = false

  ngOnInit(): void {


    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.minLength(3), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.compose([Validators.minLength(8),Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&"]).*$/), Validators.required])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.minLength(8),,Validators.pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&"]).*$/), Validators.required]))
    })

    this.name = this.form.get('name')
    this.email = this.form.get('email')
    this.password = this.form.get('password')
    this.passwordConfirm = this.form.get('passwordConfirm')
  }

  onSubmit(userDetails: any) {
    console.log("userDetails",userDetails);

    if (userDetails.password === userDetails.passwordConfirm) {
      this.authService.createNewUser({
        userName: userDetails.name,
        email: userDetails.email,
        password: userDetails.password
      }).subscribe(()=>{
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
}
