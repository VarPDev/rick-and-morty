import { Component, ChangeDetectionStrategy } from '@angular/core'
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service'
import { Observable, forkJoin, of, combineLatest } from 'rxjs'
import { CharacterResponse } from 'src/app/models/character.vm'
import { mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly characters$: Observable<CharacterResponse> = this.rickAndMortyService.characters$

  constructor(private readonly rickAndMortyService: RickAndMortyService) {
    this.rickAndMortyService.getCharacters()
    .pipe(mergeMap((response) => {
        const firstEpisode = response.results.map((c) => {
          return this.rickAndMortyService.createGetRequest(c.episode[0])
        })
        return combineLatest(forkJoin(firstEpisode), of(response))
      }))
      .subscribe(([response, characters]): void => {

        const newCharacters = {
          ...characters,
          results: [
            ...characters.results.map((c, i) => {
              return {
                ...c,
                episode: [response[i], ...c.episode.splice(0, c.episode.length)]
              }
            })
          ]
        }

        this.rickAndMortyService.updateCharacters(newCharacters)
      })
  }

}
