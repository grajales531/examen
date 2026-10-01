import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import { CachedImageDirective } from '../card/cached-image.directive';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CachedImageDirective],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
  @Input({ required: true }) card!: Card;

  showValue(value: string | number | undefined): string | number {
    return value ?? 'No aplica';
  }
}
