import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { LocationResponse } from 'src/app/models/location.vm';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() readonly lastPage: boolean;
  @Input() readonly firstPage: boolean;
  @Output() readonly changePage: EventEmitter<boolean> = new EventEmitter();

  onChangePage(next: boolean): void {
    this.changePage.emit(next);
  }
}
