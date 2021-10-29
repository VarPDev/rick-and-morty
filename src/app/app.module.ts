import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// shared components
import { HeaderComponent } from './components/shared/header/header.component'
import { FooterComponent } from './components/shared/footer/footer.component'

// pages components
import { HomeComponent } from './components/pages/home/home.component'

// reducers
import { charactersReducer } from './store/reducers/rick-and-morty.reducer';

// ngrx
import { StoreModule } from '@ngrx/store';
import { CardComponent } from './components/shared/card/card.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, CardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreModule.forRoot({ characters: charactersReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
