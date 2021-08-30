import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './service/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularTechTest';

  
  constructor(private userService: UsersService, private router: Router) {
   
  }

  ngOnInit() {
   
  }

  
  
}
