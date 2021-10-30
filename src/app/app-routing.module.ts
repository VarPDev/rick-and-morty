import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { CharacterComponent } from './components/pages/character/character.component';
import { HomePersonalComponent } from './components/pages/home-personal/home-personal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-personal', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home-personal',
    component: HomePersonalComponent,
  },
  {
    path: 'character/:id',
    component: CharacterComponent,
  },
  { path: '**', redirectTo: '/home-personal', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
