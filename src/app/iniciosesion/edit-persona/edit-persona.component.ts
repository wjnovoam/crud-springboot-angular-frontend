import { Persona, PersonaReponse } from './../interface/persona.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css'],
})
export class EditPersonaComponent implements OnInit {
  personaForm: FormGroup;

  @Input() public data;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm(this.data);
  }

  createForm(data: PersonaReponse) {
    this.personaForm = this._fb.group({
      id: [data.id, Validators.required],
      document: [
        data.document,
        [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      name: [
        data.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z ]{0,254}'),
        ],
      ],
      lastname: [
        data.lastname,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z ]{0,254}'),
        ],
      ],
      age: [data.age, [Validators.required, Validators.pattern('^[0-9]+')]],
      estature: [data.alture, Validators.required],
      peso: [data.weight, [Validators.required, Validators.pattern('^[0-9]+')]],
      talla: [data.size, [Validators.required, Validators.pattern('^[A-Z]+')]],
    });
  }
  editarPersona() {
    let newUpdate: PersonaReponse = {
      id: this.personaForm.value.id,
      name: this.personaForm.value.name,
      lastname: this.personaForm.value.lastname,
      document: this.personaForm.value.document,
      age: this.personaForm.value.age,
      alture: this.personaForm.value.estature,
      size: this.personaForm.value.talla,
      weight: this.personaForm.value.peso,
    };
    this.passEntry.emit(newUpdate);
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
