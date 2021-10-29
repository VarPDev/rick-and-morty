import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() readonly image: string
  @Input() readonly title: string
  @Input() readonly subTitle: string
  @Input() readonly firstCustomLabel: string
  @Input() readonly firstCustomValue: string
  @Input() readonly secondCustomLabel: string
  @Input() readonly secondCustomValue: string
}
