import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/card';

// Adrián: completar imagen y características; reutilizar en ambos listados.
@Component({ selector: 'app-card', standalone: true, templateUrl: './card.component.html' })
export class CardComponent {
  @Input({ required: true }) card!: Card;
  @Output() selected = new EventEmitter<Card>();
}
