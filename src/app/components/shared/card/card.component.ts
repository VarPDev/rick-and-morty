import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() readonly image: string;
  @Input() readonly title: string;
  @Input() readonly subTitle: string;
  @Input() readonly firstCustomLabel: string;
  @Input() readonly firstCustomValue: string;
  @Input() readonly secondCustomLabel: string;
  @Input() readonly secondCustomValue: string;
  @Input() readonly showDot: boolean;
  @Input() readonly dotColor: string;

  hosting: string = environment.hosting
}
