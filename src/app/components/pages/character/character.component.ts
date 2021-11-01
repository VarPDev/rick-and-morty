import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap, reduce } from 'rxjs/operators';
import { Character } from 'src/app/models/character.vm';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  readonly character$: Observable<Character> =
    this.rickAndMortyService.character$;

  constructor(
    private readonly rickAndMortyService: RickAndMortyService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.activatedRoute.paramMap
      .pipe(
        mergeMap((params) => {
          return this.rickAndMortyService.getCharacter(params.get('id'));
        }),
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
                return this.rickAndMortyService.createGetRequest(episodeUrl);
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
        })
      )
      .subscribe((response) => {
        this.rickAndMortyService.updateCharacter(response);
      });
  }

  onGoBack(): void {
    this.router.navigate(['']);
  }
}
