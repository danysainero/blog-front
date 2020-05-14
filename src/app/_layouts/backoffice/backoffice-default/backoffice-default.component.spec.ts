import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeDefaultComponent } from './backoffice-default.component';

describe('BackofficeDefaultComponent', () => {
  let component: BackofficeDefaultComponent;
  let fixture: ComponentFixture<BackofficeDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
