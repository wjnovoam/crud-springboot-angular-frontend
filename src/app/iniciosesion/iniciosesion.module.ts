import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageComponent } from './page/page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonaComponent } from './persona/persona.component';
import { ListaPersonaComponent } from './lista-persona/lista-persona.component';
import { AppRoutingModule } from '../app-routing.module';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PageComponent,
    SidebarComponent,
    PersonaComponent,
    ListaPersonaComponent,
    EditPersonaComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AppRoutingModule],
  exports: [PageComponent],
})
export class IniciosesionModule {}
