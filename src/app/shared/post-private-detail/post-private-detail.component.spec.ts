import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPrivateDetailComponent } from './post-private-detail.component';

describe('PostPrivateDetailComponent', () => {
  let component: PostPrivateDetailComponent;
  let fixture: ComponentFixture<PostPrivateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPrivateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrivateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
