import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { charactersReducer } from 'src/app/store/reducers/rick-and-morty.reducer';
import { CharacterDetailComponent } from '../../shared/character-detail/character-detail.component';
import { RickAndMortyComponent } from '../../shared/rick-and-morty/rick-and-morty.component';

import { CharacterComponent } from './character.component';

describe('HomePersonalComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ character: charactersReducer }),
      ],
      declarations: [
        CharacterComponent,
        RickAndMortyComponent,
        CharacterDetailComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
