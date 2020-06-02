import { Component, OnInit } from '@angular/core';
import { Notificacion } from './_data/notificacion';
import { NotificacionesBusService } from './_services/bussiness/notificaciones-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog-angular';
  msgs: Notificacion[] = [];

  constructor(private notificacionesBus: NotificacionesBusService) { }

  ngOnInit() {

    this.notificacionesBus.getNotificacion().subscribe(
      (notificacion) => {
        this.msgs = [];
        this.msgs.push(notificacion);
      });
  }

}
