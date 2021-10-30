import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Observable, forkJoin, of, zip } from 'rxjs';
import { CharacterResponse } from 'src/app/models/character.vm';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-personal',
  templateUrl: './home-personal.component.html',
  styleUrls: ['./home-personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePersonalComponent {
  readonly characters$: Observable<CharacterResponse> =
    this.rickAndMortyService.characters$;

  constructor(
    private readonly rickAndMortyService: RickAndMortyService,
    private readonly router: Router
  ) {
    this.getCharacters();
  }

  onOpenCharacter(character: any): void {
    this.router.navigate([`/character/${character.id}`]);
  }

  getCharacters(url: string = null): void {
    this.rickAndMortyService
      .getCharacters(url)
      .pipe(
        mergeMap((response) => {
          const firstEpisode = response.results.map((c) => {
            return this.rickAndMortyService.createGetRequest(c.episode[0]);
          });
          return zip(forkJoin(firstEpisode), of(response));
        }),
        map(([response, characters]) => {
          return {
            ...characters,
            results: [
              ...characters.results.map((c, i) => {
                return {
                  ...c,
                  episodeResponse: [
                    response[i],
                    ...c.episode.splice(0, c.episode.length),
                  ],
                };
              }),
            ],
          };
        })
      )
      .subscribe((characters): void => {
        this.rickAndMortyService.updateCharacters(characters);
      });
  }

  onChangePage(next: boolean, info: any): void {
    this.getCharacters(!!next ? info.next : info.prev);
    window.scroll(0, 0);
  }
}
