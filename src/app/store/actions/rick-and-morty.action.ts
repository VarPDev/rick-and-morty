import { createAction, props } from '@ngrx/store'
import { CharacterResponse } from 'src/app/models/character.vm'

export const charactersUpdateAction = createAction('[Characters action] charactersUpdateAction', props<{ characters: CharacterResponse }>())