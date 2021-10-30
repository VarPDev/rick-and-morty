import { createAction, props } from '@ngrx/store';
import { Character, CharacterResponse } from 'src/app/models/character.vm';

export const charactersUpdateAction = createAction(
  '[Characters action] charactersUpdateAction',
  props<{ characters: CharacterResponse }>()
);
export const characterUpdateAction = createAction(
  '[Character action] characterUpdateAction',
  props<{ character: Character }>()
);
