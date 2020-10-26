import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '@core/services/users.service';
import { map } from 'rxjs/operators';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(UsersService);

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UsersService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUser', () => {
    it('returned Observable should match the right data', () => {
      const mockEmail = 'Sincere@april.biz';
      const mockUser = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      };

      service.getUser(mockEmail)
        .pipe(
          map(user => user[0])
        )
        .subscribe(user => {
          expect(user.id).toEqual(mockUser.id);
          expect(user.name).toEqual(mockUser.name);
          expect(user.username).toEqual(mockUser.username);
          expect(user.email).toEqual(mockUser.email);
          expect(user.website).toEqual(mockUser.website);
          expect(user.phone).toEqual(mockUser.phone);
        });

      const req = httpTestingController.expectOne(
        `https://jsonplaceholder.typicode.com/users?email=${mockEmail}`
      );

      req.flush(mockUser);
    });
  });

  describe('#createPost()', () => {
    it('returned Observable should match the right data', () => {
      const mockPost = {
        userId: 1,
        title: 'title',
        body: 'description'
      };

      service.createPost({ userId: 1, title: 'title', body: 'body' })
        .subscribe(postData => {
          expect(postData.title).toEqual('title');
        });

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');

      expect(req.request.method).toEqual('POST');

      req.flush(mockPost);
    });
  });

  describe('#getUserPosts', () => {
    it('returned Observable should match the right data', () => {
      const mockPosts = [
        {
          userId: 1,
          title: 'post',
          body: 'post description'
        },
        {
          userId: 1,
          title: 'another post',
          body: 'another post description'
        }
      ];
      const userId = 1;

      service.getUserPosts(userId)
        .subscribe(postsData => {
          expect(postsData[0].title).toEqual('post');
          expect(postsData[0].body).toEqual(
            'post description'
          );

          expect(postsData[1].title).toEqual('another post');
          expect(postsData[1].body).toEqual(
            'another post description'
          );
        });

      const req = httpTestingController.expectOne(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      req.flush(mockPosts);
    });
  });

  describe('#getAllPosts', () => {
    it('returned Observable should match the right data', () => {
      const mockPosts = [
        {
          userId: 1,
          title: 'post',
          body: 'post description'
        },
        {
          userId: 2,
          title: 'another post from another user',
          body: 'another post description from another user'
        }
      ];

      service.getAllPosts()
        .subscribe(postsData => {
          expect(postsData[0].title).toEqual('post');
          expect(postsData[0].body).toEqual(
            'post description'
          );

          expect(postsData[1].title).toEqual('another post from another user');
          expect(postsData[1].body).toEqual(
            'another post description from another user'
          );
        });

      const req = httpTestingController.expectOne(
        `https://jsonplaceholder.typicode.com/posts`
      );

      req.flush(mockPosts);
    });
  });
});
