import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BackofficeDefaultComponent } from 'src/app/_layouts/backoffice/backoffice-default/backoffice-default.component';
import { GuardsService } from 'src/app/_services/bussiness/guards-service.service';
import { AuthProxyService } from 'src/app/_services/proxys/auth-proxy.service';
import { PostPrivateDetailComponent } from '../post-private-detail/post-private-detail.component';
import { PostPrivateComponent } from '../post-private/post-private.component';
import { AppLoginComponent } from './app-login.component';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;
  let authProxy: AuthProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
        {
          path: 'backoffice',
          component: BackofficeDefaultComponent,
          children: [
            {
              path: 'app',
              component: PostPrivateComponent, canActivate: [GuardsService]
            },
            {
              path: 'app/:id',
              component: PostPrivateDetailComponent, canActivate: [GuardsService]
            }, {
              path: 'login',
              component: AppLoginComponent
            },
          ]
        }
      ])],
      declarations: [AppLoginComponent, BackofficeDefaultComponent, PostPrivateComponent, PostPrivateDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    authProxy = TestBed.inject(AuthProxyService);
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should login ok', async(() => {
    const spyProxy = spyOn(authProxy, 'login').and.returnValue(of(FAKE_TOKEN));

    component.login();
    expect(spyProxy).toHaveBeenCalled();
  })
  );
});

export const FAKE_USERS =
  [{
    _id: '3453453456354345',
    role: 0,
    userName: 'admin2',
    pass: '$2b$10$r3QBq0nOhhcFVBOKpFsrbehJDBiuyoQIzDqyQQY4/RU.Co2R61qJW',
  },
  {
    _id: '3453453456354345',
    role: 1,
    userName: 'user',
    pass: '$2b$10$ClWBMeKMkyABXq46wEWlOOwDq66R2seAZtQlCEoyxwG2GseZrAd02'
  }];

export const FAKE_TOKEN =
{
  message: 'blablabla',
  token: '$2b$10$r3QBq0nOhhcFVBOKpFsrbehJDBiuyoQIzDqyQQY4/RU.Co2R61qJW',
};
