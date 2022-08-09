import { Component, OnInit } from '@angular/core';
import { IniciarsesionService } from '../iniciarsesion.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activoLista: boolean = true;
  activoAgregarPersona: boolean = false;

  get usuario() {
    return this.iniciarSesionService.getUsuario();
  }

  constructor(private iniciarSesionService: IniciarsesionService) {}

  ngOnInit(): void {}

  activarPersonas() {
    this.activoLista = true;
    this.activoAgregarPersona = false;
    this.iniciarSesionService.allPersonas();
  }

  activarAgregar() {
    this.activoLista = false;
    this.activoAgregarPersona = true;
  }
}
