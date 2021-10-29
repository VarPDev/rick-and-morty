import { createReducer, on } from '@ngrx/store'
import { charactersUpdateAction } from '../actions/rick-and-morty.action'
import { CharacterResponse } from 'src/app/models/character.vm'

export const initialState: any = {characters: new CharacterResponse()}

export const charactersReducer = createReducer(initialState,
  on(charactersUpdateAction, (state, { characters }) => ({
    characters
  }))
)