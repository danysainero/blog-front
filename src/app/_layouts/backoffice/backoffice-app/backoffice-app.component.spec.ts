import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackofficeAppComponent } from './backoffice-app.component';


describe('BackofficeAppComponent', () => {
  let component: BackofficeAppComponent;
  let fixture: ComponentFixture<BackofficeAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackofficeAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackofficeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
