import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { Posts } from '../models/posts.model';
import { Users } from '../models/users.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']  
})
export class CardsComponent implements OnInit {
  @Input()
  carditem!: Posts;
  constructor() { }

  ngOnInit(): void {
   
  }

}
