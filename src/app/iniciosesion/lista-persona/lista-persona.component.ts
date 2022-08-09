import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EditPersonaComponent } from '../edit-persona/edit-persona.component';
import { IniciarsesionService } from '../iniciarsesion.service';
import { Persona } from './../interface/persona.interface';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css'],
})
export class ListaPersonaComponent implements OnInit {
  //listaPersonas: Array<Persona> = [];

  get listaPersonas() {
    return this.iniciarSesionService.listaPersonas;
  }

  constructor(
    private iniciarSesionService: IniciarsesionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  editarPersona(person: Persona) {
    const modal = this.modalService.open(EditPersonaComponent, { size: 'lg' });
    modal.componentInstance.data = person;

    modal.componentInstance.passEntry.subscribe((response) => {
      console.log(response);
      this.iniciarSesionService.updatePersona(response);
      modal.dismiss();
    });
  }

  eliminarPersona(id: number) {
    console.log(id);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esto.!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.iniciarSesionService.eliminarPersonaId(id);
        Swal.fire('Eliminado!', 'Ha sido eliminado con exito.', 'success');
      }
    });
  }
}
