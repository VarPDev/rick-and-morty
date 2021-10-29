export class CharacterResponse {
  info: Info = null
  results: Array<Character> = null
}

class Info {
  count: number
  pages: number
  next: string
  prev: string
}

class Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Location
  image: string
  episode: Array<string>
  url: string
  created: string
}

class Origin {
  name: string
  url: string
}

class Location {
  name: string
  url: string
}

