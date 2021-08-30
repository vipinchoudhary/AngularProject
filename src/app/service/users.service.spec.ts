import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { Users } from '../models/users.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [        
        HttpClientTestingModule 
      ],
      providers: [UsersService]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.get(HttpTestingController);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('be able to retrieve posts from the API bia GET', () => {
    const email: string='Sincere@april.biz';
    const dummyPosts: Users = 
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
       };
        
    service.getUserByEmail(email).subscribe(posts => {       
        expect(posts).toEqual(dummyPosts);
    });    
    const request = httpMock.expectOne( `${service.url}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
    });

});
