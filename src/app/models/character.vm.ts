import { Observable } from 'rxjs';
import { LocationResponse } from './location.vm';

export class CharacterResponse {
  info: Info = null;
  results: Array<Character> = null;
}

class Info {
  count: number = null;
  pages: number = null;
  next: string = null;
  prev: string = null;
}

export class Character {
  id: number = null;
  name: string = null;
  status: string = null;
  species: string = null;
  type: string = null;
  gender: string = null;
  origin: Origin = null;
  location: Location = null;
  image: string = null;
  episode: Array<string> = null;
  episodeRequest: Array<Observable<any>> = null;
  episodeResponse: Array<Episode> = null;
  locationResponse: LocationResponse = null;
  originResponse: LocationResponse = null;
  url: string = null;
  created: string = null;
}

class Origin {
  name: string = null;
  url: string = null;
}

class Location {
  name: string = null;
  url: string = null;
}

class Episode {
  id: number = null;
  name: string = null;
  air_date: string = null;
  episode: string = null;
  characters: Array<string> = null;
  url: string = null;
  created: string = null;
}
