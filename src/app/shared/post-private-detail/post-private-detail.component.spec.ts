import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostsProxyService } from 'src/app/_services/proxys/posts-proxy.service';
import { FAKE_POSTS } from 'src/app/_services/proxys/posts-proxy.service.spec';
import { PostPrivateDetailComponent } from './post-private-detail.component';

describe('PostPrivateDetailComponent', () => {
  let component: PostPrivateDetailComponent;
  let fixture: ComponentFixture<PostPrivateDetailComponent>;
  let proxy: PostsProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ PostPrivateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrivateDetailComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(PostsProxyService);
    fixture.detectChanges();
  });

  it('should create post private detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should get private post by id', async(() => {
    const spyProxy = spyOn(proxy, 'getPostsById').and.returnValue(of(FAKE_POSTS[0]));
    component.ngOnInit();
    component.post$.subscribe(
      posts => {
        expect(posts.postId).toEqual(FAKE_POSTS[0]._id);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  })
  );
});
