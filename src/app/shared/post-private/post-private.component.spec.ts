import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPrivateComponent } from './post-private.component';

describe('PostPrivateComponent', () => {
  let component: PostPrivateComponent;
  let fixture: ComponentFixture<PostPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
