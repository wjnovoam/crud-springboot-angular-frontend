import { User } from './../interface/user.interface';
import { IniciarsesionService } from './../iniciarsesion.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: FormGroup;
  constructor(
    private iniciarSesionService: IniciarsesionService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.user = this._fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[A-Za-z0-9]+'),
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
      document: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+'),
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "[a-zA-Z0-9!#$%&'*_+-]([.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|d)+[a-zA-Z0-9][.][a-zA-Z]{2,4}([.][a-zA-Z]{2})?"
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  mostrarLogin() {
    this.iniciarSesionService.mostrarRegister();
    this.iniciarSesionService.mostrarLogin();
  }

  registrarUsuario() {
    let newUser: User = {
      name: this.user.value.name,
      username: this.user.value.username,
      lastname: this.user.value.lastname,
      document: this.user.value.document,
      email: this.user.value.email,
      password: this.user.value.password,
    };
    this.iniciarSesionService.registrarUser(newUser);
    this.user.reset();
  }

  get document() {
    return this.user.get('document');
  }

  get name() {
    return this.user.get('name');
  }

  get lastname() {
    return this.user.get('lastname');
  }

  get username() {
    return this.user.get('username');
  }

  get email() {
    return this.user.get('email');
  }

  get password() {
    return this.user.get('password');
  }
}
