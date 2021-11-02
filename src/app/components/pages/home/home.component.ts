// IMPORTANT: don't use this component, it is for demonstration purposes only

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { Observable, from, of, forkJoin } from 'rxjs';
import { CharacterResponse, Info } from 'src/app/models/character.vm';
import { concatMap, map, mergeMap, reduce } from 'rxjs/operators';
import { rateLimit } from 'src/app/operators/rate-limit.operator';

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
    // Use only one of these methods
    this.getCharactersMerge();
    // this.getCharactersConcat();
  }

  // this method is used to get characters and other information simultaneously, but with a queue to avoid to many request error
  getCharactersMerge(url: string = null): void {
    this.rickAndMortyService.updateCharacters(null);
    this.rickAndMortyService
      .getCharacters(url)
      .pipe(
        mergeMap((response) => {
          return from(response.results).pipe(
            // ratelimit is a custom operator that we can define how many requests can occur over a given time period
            // I used this to avoid "too many request" error
            rateLimit(1, 1000),
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

            mergeMap((c) => {
              return forkJoin([
                this.rickAndMortyService.createGetRequest(c.location.url),
                this.rickAndMortyService.createGetRequest(c.origin.url),
                forkJoin(c.episodeRequest).pipe(rateLimit(10, 300)),
                of(c),
              ]);
            }),
            map(([locationResponse, originResponse, episodes, c]) => {
              return {
                ...c,
                locationResponse,
                originResponse,
                episodeResponse: episodes,
              };
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

  // this method is used to get characters and other information one after the other
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

  onChangePage(next: boolean, info: Info): void {
    this.getCharactersMerge(!!next ? info.next : info.prev);
    window.scroll(0, 0);
  }
}
