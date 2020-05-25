import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostsProxyService } from 'src/app/_services/proxys/posts-proxy.service';
import { FAKE_POSTS } from 'src/app/_services/proxys/posts-proxy.service.spec';
import { PostDetailComponent } from './post-detail.component';


describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let proxy: PostsProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [PostDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(PostsProxyService);
    fixture.detectChanges();
  });

  it('should create post public detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should get public post by id', async(() => {
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
