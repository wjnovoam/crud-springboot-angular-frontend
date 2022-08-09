import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './iniciosesion/sidebar/sidebar.component';
import { PageComponent } from './iniciosesion/page/page.component';
import { PersonaComponent } from './iniciosesion/persona/persona.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'sidebar',
    component: SidebarComponent,
  },
  {
    path: 'inicio',
    component: PageComponent,
  },
  {
    path: 'personas',
    component: PersonaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
