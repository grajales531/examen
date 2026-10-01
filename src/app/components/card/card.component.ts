import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/card';
import { CachedImageDirective } from './cached-image.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CachedImageDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({ required: true }) card!: Card;
  @Output() selected = new EventEmitter<Card>();

  // El operador ?? conserva valores válidos como cero.
  showValue(value: string | number | undefined): string | number {
    return value ?? 'No aplica';
  }
}
