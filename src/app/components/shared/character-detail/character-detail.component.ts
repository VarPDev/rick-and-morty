import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Character } from 'src/app/models/character.vm';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailComponent {
  @Input() readonly character: Character;
}
