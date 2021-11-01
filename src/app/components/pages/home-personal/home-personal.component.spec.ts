import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { charactersReducer } from 'src/app/store/reducers/rick-and-morty.reducer';
import { CardComponent } from '../../shared/card/card.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { RickAndMortyComponent } from '../../shared/rick-and-morty/rick-and-morty.component';

import { HomePersonalComponent } from './home-personal.component';

describe('HomePersonalComponent', () => {
  let component: HomePersonalComponent;
  let fixture: ComponentFixture<HomePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot({ characters: charactersReducer }),
      ],
      declarations: [
        HomePersonalComponent,
        CardComponent,
        RickAndMortyComponent,
        PaginatorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
