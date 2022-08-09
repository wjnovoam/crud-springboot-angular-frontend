import { IniciarsesionService } from './../iniciarsesion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  constructor(private iniciarSesionService: IniciarsesionService) {}

  //login: boolean = true;

  get login() {
    return this.iniciarSesionService.login;
  }

  get register() {
    return this.iniciarSesionService.register;
  }

  ngOnInit(): void {
    console.log('Inicio correctamente');
  }
}
