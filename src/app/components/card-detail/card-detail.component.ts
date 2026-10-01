import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';

// Adrián: completar los datos y la tabla de impresiones de card.card_sets.
@Component({ selector: 'app-card-detail', standalone: true, templateUrl: './card-detail.component.html' })
export class CardDetailComponent { @Input({ required: true }) card!: Card; }
