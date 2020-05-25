import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BackofficeDefaultComponent } from './backoffice-default.component';

describe('BackofficeDefaultComponent', () => {
  let component: BackofficeDefaultComponent;
  let fixture: ComponentFixture<BackofficeDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ BackofficeDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create backoffice layout', () => {
    expect(component).toBeTruthy();
  });
});
