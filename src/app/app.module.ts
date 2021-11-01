import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// shared components
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import { RickAndMortyComponent } from './components/shared/rick-and-morty/rick-and-morty.component';
import { PlanetComponent } from './components/shared/planet/planet.component';

// pages components
import { HomeComponent } from './components/pages/home/home.component';
import { HomePersonalComponent } from './components/pages/home-personal/home-personal.component';
import { CharacterComponent } from './components/pages/character/character.component';

// reducers
import { charactersReducer } from './store/reducers/rick-and-morty.reducer';

// interceptors
import { HttpErrorInterceptor } from './interceptors/http.interceptor';

// ngrx
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/shared/card/card.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { CharacterDetailComponent } from './components/shared/character-detail/character-detail.component';

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
    PaginatorComponent,
    SpinnerComponent,
    CharacterDetailComponent,
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
