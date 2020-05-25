import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostsProxyService } from 'src/app/_services/proxys/posts-proxy.service';
import { FAKE_POSTS } from 'src/app/_services/proxys/posts-proxy.service.spec';
import { PostPrivateComponent } from './post-private.component';


describe('PostPrivateComponent', () => {
  let component: PostPrivateComponent;
  let fixture: ComponentFixture<PostPrivateComponent>;
  let proxy: PostsProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [PostPrivateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrivateComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(PostsProxyService);
    fixture.detectChanges();
  });

  it('should create post private component', () => {
    expect(component).toBeTruthy();
  });

  it('should get posts', async(() => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.returnValue(of(FAKE_POSTS));
    component.ngOnInit();
    component.posts.subscribe(
      posts => {
        expect(posts[0].postId).toEqual(FAKE_POSTS[0]._id);
      }
    );

    expect(spyProxy).toHaveBeenCalled();
  })
  );


});
