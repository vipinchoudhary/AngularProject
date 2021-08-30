import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';
import { PostsService } from '../service/posts.service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  saveposts: Posts = new Posts();
  public userPosts!: Posts[];
  public otherUserPost!: Posts[];
  loginsUsers! :any;
  currentUser!: Users;
  isLogin : boolean=false;
  addPost: boolean=false;
  constructor(
    private userService: UsersService, private router: Router, private postService: PostsService
  ) {   
    if (!this.userService.currentUserValue) { 
      this.router.navigate(['/']);
  }
  else{
    this.isLogin= true;
  }

  this.userService.currentUser.subscribe((data => this.loginsUsers = data))  

  }

  

  ngOnInit() {  
      this.currentUser = this.loginsUsers[0]!;
      this.loadpost(this.currentUser.id!);
  }

  loadpost(userid: number) 
  {
   this.postService.getLoginUserPost(userid).subscribe((uposts: Posts[]) => {
    this.userPosts = uposts;    
  });

  this.postService.getPostforOtherUsers().subscribe((uposts: Posts[]) => {
    
       this.otherUserPost = uposts.filter(x => x.userId != userid);     
  });
  }

  logout() : void {
    this.userService.logout();
    this.isLogin=false;
    this.router.navigate(['/login']);
} 

addPosts(): void{
  this.addPost = true;
}

savePost() :void{
  
  this.saveposts.userId = this.currentUser.id!;
  this.saveposts.id = this.userPosts.length + this.otherUserPost.length +1;
   this.userPosts.push(this.saveposts);
   this.addPost = false;
}

}
