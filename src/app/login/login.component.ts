import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import { UsersService } from '../service/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin: boolean = false;
  public users: any;
  constructor(private userService: UsersService, private router: Router) {}

 public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
   
    this.userService
      .getUserByEmail(this.form.value['email'])
      .pipe(first())
      .subscribe(data => {        
        this.isLogin = true;
        this.users =data;  
     if(this.users[0].id != null)
       this.router.navigate(['/home']);
       else
       this.router.navigate(['/']);
      });
  }

}
