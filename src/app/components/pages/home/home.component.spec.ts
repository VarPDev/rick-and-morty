import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { charactersReducer } from 'src/app/store/reducers/rick-and-morty.reducer';
import { CardComponent } from '../../shared/card/card.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { RickAndMortyComponent } from '../../shared/rick-and-morty/rick-and-morty.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ characters: charactersReducer }),
      ],
      declarations: [
        HomeComponent,
        CardComponent,
        RickAndMortyComponent,
        PaginatorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
