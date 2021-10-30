import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// shared components
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// pages components
import { HomeComponent } from './components/pages/home/home.component';
import { HomePersonalComponent } from './components/pages/home-personal/home-personal.component';
import { CharacterComponent } from './components/pages/character/character.component';

// reducers
import { charactersReducer } from './store/reducers/rick-and-morty.reducer';

// ngrx
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/shared/card/card.component';
import { PlanetComponent } from './components/shared/planet/planet.component';
import { RickAndMortyComponent } from './components/shared/rick-and-morty/rick-and-morty.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardComponent,
    HomePersonalComponent,
    CharacterComponent,
    PlanetComponent,
    RickAndMortyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      characters: charactersReducer,
      character: charactersReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
