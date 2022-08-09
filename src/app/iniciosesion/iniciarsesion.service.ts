import { LoginResponse } from './interface/loginresponse.interface';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from './interface/user.interface';
import { Login } from './interface/login.interface';
import { UserResponse } from './interface/userresponse.interface';
import { Persona, PersonaReponse } from './interface/persona.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class IniciarsesionService {
  private URL = 'http://localhost:9191/api';
  private PATH_LOGIN = '/auth/login';
  private PATH_REGISTER_USER = '/auth/register';
  private PATH_PERSONS = '/persons';

  login: boolean = true;
  register: boolean = false;
  inicioCorrecto: boolean;
  listaPersonas: Array<Persona> = [];

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion(login: Login) {
    this.http.post<LoginResponse>(this.URL + this.PATH_LOGIN, login).subscribe(
      (response) => {
        console.log(response);
        this.guardarUser(login.usernameOrEmail);
        this.guardarToken(response.tokenOfAccess);
        this.allPersonas();
        Swal.fire({
          icon: 'success',
          title: 'Inicio sesion correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          this.router.navigate(['sidebar']);
        }, 1500);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          showConfirmButton: false,
          timer: 1500,
        });
        this.inicioCorrecto = false;
      }
    );
  }

  registrarUser(user: User) {
    this.http
      .post<UserResponse>(this.URL + this.PATH_REGISTER_USER, user)
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['inicio']);
          }, 1500);
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);

          Swal.fire({
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  registrarPersona(persona: Persona) {
    let token = this.getToken();

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    console.log(header);

    this.http
      .post<UserResponse>(this.URL + this.PATH_PERSONS, persona, {
        headers: header,
      })
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Persona creada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.allPersonas();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  allPersonas() {
    this.http
      .get<Array<PersonaReponse>>(this.URL + this.PATH_PERSONS)
      .subscribe(
        (response) => {
          console.log(response);
          this.listaPersonas = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.inicioCorrecto = false;
        }
      );
  }

  updatePersona(persona: PersonaReponse) {
    let token = this.getToken();

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .put(this.URL + this.PATH_PERSONS + '/' + persona.id, persona, {
        headers: header,
      })
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Persona actualizada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          this.allPersonas();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  eliminarPersonaId(id: number) {
    let token = this.getToken();

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(this.URL + this.PATH_PERSONS + '/' + id, {
        headers: header,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.allPersonas();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public guardarToken(token: string) {
    window.sessionStorage.setItem('Token', token);
  }

  public getToken() {
    return sessionStorage.getItem('Token');
  }

  public guardarUser(nameUsuario: string) {
    window.sessionStorage.setItem('Usuario', nameUsuario);
  }

  public getUsuario() {
    return sessionStorage.getItem('Usuario');
  }

  mostrarLogin() {
    this.login = !this.login;
    console.log('Login:', this.login);
  }

  mostrarRegister() {
    this.register = !this.register;
    console.log('Register:', this.login);
  }
}
