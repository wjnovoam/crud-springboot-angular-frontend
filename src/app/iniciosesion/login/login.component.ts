import { Login } from './../interface/login.interface';
import { Component, OnInit } from '@angular/core';
import { IniciarsesionService } from '../iniciarsesion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private iniciarSesionService: IniciarsesionService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      //prettier-ignore
      password: ['',Validators.required],
    });
  }

  mostrarRegister() {
    this.iniciarSesionService.mostrarLogin();
    this.iniciarSesionService.mostrarRegister();
  }

  async iniciarSesion() {
    let newLogin: Login = {
      usernameOrEmail: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    console.log(newLogin);
    this.iniciarSesionService.iniciarSesion(newLogin);
  }
}
