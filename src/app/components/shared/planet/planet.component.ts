import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { LocationResponse } from 'src/app/models/location.vm';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetComponent {
  @Input() readonly planet: LocationResponse;
}
