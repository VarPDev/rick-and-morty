import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Observable, from, of, forkJoin } from 'rxjs';
import { CharacterResponse } from 'src/app/models/character.vm';
import { concatMap, map, mergeMap, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly characters$: Observable<CharacterResponse> =
    this.rickAndMortyService.characters$;

  constructor(private readonly rickAndMortyService: RickAndMortyService) {
    this.getCharactersMerge();
    // this.getCharactersConcat();
  }

  getCharactersMerge(url: string = null): void {
    this.rickAndMortyService.updateCharacters(null);
    this.rickAndMortyService
      .getCharacters(url)
      .pipe(
        mergeMap((response) => {
          return from(response.results).pipe(
            mergeMap((c) => {
              return forkJoin([
                this.rickAndMortyService.createGetRequest(c.location.url),
                this.rickAndMortyService.createGetRequest(c.origin.url),
                of(c),
              ]);
            }),
            map(([locationResponse, originResponse, c]) => {
              return {
                ...c,
                locationResponse,
                originResponse,
                episodeRequest: [
                  ...c.episode.map((episodeUrl) => {
                    return this.rickAndMortyService.createGetRequest(
                      episodeUrl
                    );
                  }),
                ],
              };
            }),
            mergeMap((c) => {
              return from(c.episodeRequest).pipe(
                // Now we use concatMap as this will force RxJS to wait for each request
                // to complete before starting the next one, ensuring we have all the
                // data needed for each episode
                mergeMap((e) => e),
                // We then need to collect each of these API responses and map them back into
                // a single array of episodes
                reduce((episodes, episode) => [...episodes, episode], []),
                // Finally we then map the character data and the episode data into one precise
                // object that we care about
                map((episodes) => ({
                  ...c,
                  episodeResponse: episodes,
                }))
              );
            }),
            reduce((characters, c) => [...characters, c], []),
            map((characters) => ({
              ...response,
              results: characters,
            }))
          );
        })
      )
      .subscribe((response): void => {
        this.rickAndMortyService.updateCharacters(response);
      });
  }

  getCharactersConcat(url: string = null): void {
    this.rickAndMortyService.updateCharacters(null);
    this.rickAndMortyService
      .getCharacters(url)
      .pipe(
        mergeMap((response) => {
          return from(response.results).pipe(
            map((c) => {
              return {
                ...c,
                episodeRequest: [
                  ...c.episode.map((episodeUrl) => {
                    return this.rickAndMortyService.createGetRequest(
                      episodeUrl
                    );
                  }),
                ],
              };
            }),
            concatMap((c) => {
              return from(c.episodeRequest).pipe(
                // Now we use concatMap as this will force RxJS to wait for each request
                // to complete before starting the next one, ensuring we have all the
                // data needed for each episode
                concatMap((e) => e),
                // We then need to collect each of these API responses and map them back into
                // a single array of episodes
                reduce((episodes, episode) => [...episodes, episode], []),
                // Finally we then map the character data and the episode data into one precise
                // object that we care about
                map((episodes) => ({
                  ...c,
                  episodeResponse: episodes,
                }))
              );
            }),
            reduce(
              (characters, characterItem) => [...characters, characterItem],
              []
            ),
            map((characters) => ({
              ...response,
              results: characters,
            }))
          );
        })
      )
      .subscribe((response): void => {
        this.rickAndMortyService.updateCharacters(response);
      });
  }

  onChangePage(next: boolean, info: any): void {
    this.getCharactersMerge(!!next ? info.next : info.prev);
    window.scroll(0, 0);
  }
}
