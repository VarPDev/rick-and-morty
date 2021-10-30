import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { LocationResponse } from 'src/app/models/location.vm';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RickAndMortyComponent {}
