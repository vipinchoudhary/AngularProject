import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import {HttpTestingController} from '@angular/common/http/testing';
import { Posts } from '../models/posts.model';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [        
        HttpClientTestingModule 
      ],
      providers: [PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve posts from the API bia GET', () => {
    const userid: number=1;
    const dummyPosts: Posts = {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };
        const otherdummyPosts: Posts = {
          "userId": 2,
    "id": 11,
    "title": "et ea vero quia laudantium autem",
    "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
   };
    service.getLoginUserPost(userid).subscribe(posts => {
        expect(posts.length).toBe(10);
        expect(posts[0]!).toEqual(dummyPosts);
    });

    service.getPostforOtherUsers().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts.filter(x=> x.userId != userid)[0]).toEqual(otherdummyPosts);
  });
    const request = httpMock.expectOne( `${service.url}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
    });
});
