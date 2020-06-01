import { TestBed } from '@angular/core/testing';
import { NotificacionesBusService } from './notificaciones-bus.service';


describe('NotificacionesBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificacionesBusService = TestBed.get(NotificacionesBusService);
    expect(service).toBeTruthy();
  });
});
