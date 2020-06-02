import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Notificacion } from 'src/app/_data/notificacion';



@Injectable({
  providedIn: 'root'
})
export class NotificacionesBusService {

  showNotificacionSource: ReplaySubject<Notificacion>;

  constructor() {
    this.showNotificacionSource = new ReplaySubject<Notificacion>();
  }

  getNotificacion(): Observable<Notificacion> {
    return this.showNotificacionSource.asObservable();
  }
  showError(msg: string, summary?: string) {

    this.show('error', summary, msg);
  }
  showSuccess(msg: string, summary?: string) {
    this.show('success', summary, msg);
  }
  showInfo(msg: string, summary?: string) {
    this.show('info', summary, msg);
  }
  showWarn(msg: string, summary?: string) {
    this.show('warn', summary, msg);
  }
  private show(severity: string, summary: string, msg: string) {
    const notificacion: Notificacion = {
      severity,
      summary,
      detail: msg
    };
    this.notify(notificacion);
  }
  private notify(notificacion: Notificacion): void {
    this.showNotificacionSource.next(notificacion);
  }

}
