import { IniciarsesionService } from './../iniciarsesion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../interface/persona.interface';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  personaForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private iniciarSesionService: IniciarsesionService
  ) {}

  nombresInput: string = '';
  apellidosInput: string = '';
  documentoInput: string = '';
  edadInput: number = null;
  estaturaInput: number = null;
  pesoInput: number = null;
  tallaInput: number = null;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.personaForm = this._fb.group({
      document: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z ]{0,254}'),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z ]{0,254}'),
        ],
      ],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      estature: ['', Validators.required],
      peso: ['', [Validators.required, Validators.pattern('^[0-9]+')]],
      talla: ['', [Validators.required, Validators.pattern('^[A-Z]+')]],
    });
  }

  insertarPersona() {
    let newPersona: Persona = {
      name: this.personaForm.value.name,
      lastname: this.personaForm.value.lastname.toUpperCase(),
      document: this.personaForm.value.document,
      age: this.personaForm.value.age,
      alture: this.personaForm.value.estature,
      size: this.personaForm.value.talla,
      weight: this.personaForm.value.peso,
    };
    console.log(newPersona);

    this.iniciarSesionService.registrarPersona(newPersona);
    this.personaForm.reset();
  }

  get document() {
    return this.personaForm.get('document');
  }

  get name() {
    return this.personaForm.get('name');
  }

  get lastname() {
    return this.personaForm.get('lastname');
  }

  get age() {
    return this.personaForm.get('age');
  }

  get peso() {
    return this.personaForm.get('peso');
  }

  get talla() {
    return this.personaForm.get('talla');
  }
}
