import { createReducer, on } from '@ngrx/store';
import {
  charactersUpdateAction,
  characterUpdateAction,
} from '../actions/rick-and-morty.action';
import { Character, CharacterResponse } from 'src/app/models/character.vm';

export const initialState: any = {
  characters: new CharacterResponse(),
  character: new Character(),
};

export const charactersReducer = createReducer(
  initialState,
  on(charactersUpdateAction, (state, { characters }) => ({
    characters,
  })),
  on(characterUpdateAction, (state, { character }) => ({
    character,
  }))
);
